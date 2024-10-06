import { DangerIcon, EmailIcon, PhoneIcon } from "@/components/icons";
import { Household } from "@/entities/people/household";
import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface HouseholdUpdateRequest {
  id: string;
  name: string;
  memberPersonIds: string[];
  headPersonId: string;
}

const PersonCombo = ({
  onPersonSelected,
}: {
  onPersonSelected?: (person: Person) => void;
}) => {
  const [prefixKeyword, setPrefixKeyword] = useState<string>("");
  const [personList, setPersonList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePrefixKeywordChange = debounce((prefix: string) => {
    setPrefixKeyword(prefix);
  }, 1000);

  useEffect(() => {
    if (prefixKeyword.length >= 3) {
      peopleService
        .searchPerson({ limit: 100, lastID: "", namePrefix: prefixKeyword })
        .then((persons) => {
          setPersonList(persons);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [prefixKeyword]);

  return (
    <Autocomplete
      aria-label="household-member"
      placeholder="Search for someone..."
      onInputChange={(e) => {
        setIsLoading(true);
        handlePrefixKeywordChange(e);
      }}
      onKeyDown={(e: any) => e.continuePropagation()}
      scrollRef={{ current: null }}
      onSelectionChange={(id) => {
        const person = personList.find((p) => p.id === id);
        if (person) {
          onPersonSelected?.(person);
        }
      }}
      isLoading={isLoading}
    >
      {personList.map((person) => (
        <AutocompleteItem key={person.id}>
          {person.getFullName()}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

const HouseholdDeletionModal = ({
  isOpen,
  household,
  onOpenChange,
  onSuccess = () => {},
}: {
  isOpen: boolean;
  household: Household;
  onOpenChange: () => void;
  onSuccess?: (household: Household | undefined | null) => void;
}) => {
  const { register, handleSubmit } = useForm<HouseholdUpdateRequest>({
    mode: "onSubmit",
  });
  const deleteHousehold = (request: HouseholdUpdateRequest) => {
    peopleService
      .deleteHousehold(request.id)
      .then((result) => {
        if (result) onSuccess(undefined);
        onOpenChange();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(deleteHousehold)}>
            <ModalHeader className="flex flex-col justify-center items-center">
              <div>
                <DangerIcon size={64} />
              </div>
              <div className="text-2xl">Delete Household</div>
              <input type="hidden" {...register("id")} value={household.id} />
            </ModalHeader>
            <ModalBody>
              <p className="text-center">
                Are you sure you want to delete the <em>{household.name}</em>{" "}
                Household?
              </p>
              <p className="text-center">This is not reversible.</p>
            </ModalBody>
            <ModalFooter className="items-center flex flex-row">
              <Button
                onPress={() => {
                  onClose();
                }}
              >
                No, Keep it
              </Button>
              <Button type="submit" color="danger">
                Yes, Delete it!
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export const UpdateHouseholdModal = ({
  isOpen,
  household,
  onOpenChange,
  onSuccess = () => {},
}: {
  isOpen: boolean;
  household: Household;
  onOpenChange: () => void;
  onSuccess?: (household: Household | undefined | null) => void;
}) => {
  const [isOnSearch, setIsOnSearch] = useState<boolean>(false);
  const [personList, setPersonList] = useState<Person[]>([]);
  const [primaryPersonId, setPrimaryPersonId] = useState<string>("");

  const {
    isOpen: isDeletionOpen,
    onOpen: onDeletionOpen,
    onOpenChange: onDeletionOpenChange,
  } = useDisclosure();

  const addPerson = (person: Person) => {
    setPersonList([...personList, person]);
  };

  useEffect(() => {
    setPersonList([household.householdHead, ...household.members]);
    setPrimaryPersonId(household.householdHead.id);
  }, [household]);

  const { register, unregister, handleSubmit } =
    useForm<HouseholdUpdateRequest>({
      mode: "onSubmit",
    });

  useEffect(() => {
    personList.forEach((_, idx) => {
      unregister(`memberPersonIds.${idx}`);
    });
    unregister("headPersonId");
  }, [personList, unregister, primaryPersonId]);

  const updateHousehold = (request: HouseholdUpdateRequest) => {
    let members = personList.map((p) => p.id);
    members = members.filter((id) => id !== primaryPersonId);

    peopleService
      .updateHousehold({
        id: request.id,
        name: request.name,
        memberPersonIds: members,
        headPersonId: primaryPersonId,
      })
      .then((updatedHousehold) => {
        if (updatedHousehold) onSuccess(updatedHousehold);
        onOpenChange();
      })
      .catch((error) => {
        //TODO toast
      });
  };
  const removePersonFromList = (person: Person) => {
    setPersonList(personList.filter((p) => p.id !== person.id));
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(updateHousehold)}>
            <ModalHeader>Household</ModalHeader>
            <ModalBody>
              <HouseholdDeletionModal
                isOpen={isDeletionOpen}
                onOpenChange={onDeletionOpenChange}
                household={household}
                onSuccess={onSuccess}
              />
              <div>
                <Input
                  label="Household Name"
                  labelPlacement="inside"
                  defaultValue={household.name}
                  {...register("name")}
                />
                <input type="hidden" value={household.id} {...register("id")} />
              </div>
              {/* <div>Profpic Dropzone Here</div> */}
              <div>
                {personList.map((person, idx) => (
                  <Card key={person.id}>
                    <CardHeader className="flex flex-row justify-between w-full">
                      <User name={person.getFullName()} />
                      {primaryPersonId == person.id && (
                        <Chip color="success" className="text-white">
                          Primary
                        </Chip>
                      )}

                      <input
                        type="hidden"
                        defaultValue={person.id}
                        key={person.id}
                        {...register(`memberPersonIds.${idx}`)}
                      />
                    </CardHeader>
                    <CardBody className="grid grid-cols-11 gap-4 justify-start">
                      <div className="col-span-1"></div>
                      {person.emailAddress && (
                        <span className="col-span-5 grid grid-cols-8 text-sm gap-4">
                          <EmailIcon size={16} />
                          <em className="col-span-7">{person.emailAddress}</em>
                        </span>
                      )}
                      {person.phoneNumber && (
                        <span className="col-span-5 text-sm grid grid-cols-8 gap-4">
                          <PhoneIcon size={16} />
                          <em className="col-span-7">{person.phoneNumber}</em>
                        </span>
                      )}
                    </CardBody>
                    <CardFooter className="gap-2">
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => {
                          removePersonFromList(person);
                        }}
                      >
                        Remove
                      </Button>
                      {primaryPersonId != person.id && (
                        <Button
                          size="sm"
                          color="success"
                          onClick={() => {
                            setPrimaryPersonId(person.id);
                          }}
                          className="text-white"
                        >
                          Make Primary
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div>
                {isOnSearch && (
                  <PersonCombo
                    onPersonSelected={(person: Person) => {
                      addPerson(person);
                      setIsOnSearch(false);
                    }}
                  />
                )}
              </div>
              <div>
                {!isOnSearch && (
                  <Button
                    color="secondary"
                    onClick={() => setIsOnSearch(true)}
                    size="sm"
                  >
                    Add
                  </Button>
                )}
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-row justify-between">
              <Button color="danger" size="sm" onClick={onDeletionOpen}>
                Remove Household
              </Button>
              <div className="flex gap-2">
                <Button color="primary" size="sm" type="submit">
                  Save
                </Button>
                <Button color="default" size="sm" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
