import { EmailIcon, PhoneIcon } from "@/components/icons";
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
} from "@nextui-org/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

export const PersonCombo = ({
  onPersonSelected,
  onCancel,
}: {
  onPersonSelected?: (person: Person) => void;
  onCancel?: () => void;
}) => {
  const [prefixKeyword, setPrefixKeyword] = useState<string>("");
  const [personList, setPersonList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePrefixKeywordChange = debounce((prefix: string) => {
    setPrefixKeyword(prefix);
  }, 1000);

  useEffect(() => {
    if (prefixKeyword.length >= 3) {
      peopleService.search(
        { limit: 100, lastID: "", namePrefix: prefixKeyword },
        {
          onSuccess: function (persons: Person[]): void {
            setPersonList(persons);
            setIsLoading(false);
          },
          onError: function (err: any): void {
            console.log(err);
            setIsLoading(false);
          },
        }
      );
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
      isLoading={isLoading}
    >
      {personList.map((person) => (
        <AutocompleteItem
          key={person.id}
          onClick={() => {
            onPersonSelected?.(person);
          }}
        >
          {person.getFullName()}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export const UpdateHouseholdModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const [isOnSearch, setIsOnSearch] = useState<boolean>(false);
  const [personList, setPersonList] = useState<Person[]>([]);
  const [primaryPersonId, setPrimaryPersonId] = useState<string>("");
  const addPerson = (person: Person) => {
    setPersonList([...personList, person]);
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
          <form>
            <ModalHeader>Household</ModalHeader>
            <ModalBody>
              <div>
                <Input label="Household Name" labelPlacement="inside" />
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
                      <input type="hidden" value={person.id} />
                    </CardHeader>
                    <CardBody className="grid grid-cols-11 gap-4 justify-start">
                      <div className="col-span-1"></div>
                      <span className="col-span-5 grid grid-cols-8 text-sm gap-4">
                        <EmailIcon />
                        <em className="col-span-7">{person.emailAddress}</em>
                      </span>
                      <span className="col-span-5 text-sm grid grid-cols-8 gap-4">
                        <PhoneIcon />
                        <em className="col-span-7">{person.phoneNumber}</em>
                      </span>
                    </CardBody>
                    <CardFooter className="gap-2">
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => {
                          setPersonList(
                            personList.filter((p) => p.id !== person.id)
                          );
                        }}
                      >
                        Remove
                      </Button>
                      {primaryPersonId != person.id && (
                        <Button
                          size="sm"
                          color="success"
                          onClick={() => setPrimaryPersonId(person.id)}
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
                    onCancel={() => {
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
              <Button color="danger" size="sm">
                Remove Household
              </Button>
              <div className="flex gap-2">
                <Button color="primary" size="sm">
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
