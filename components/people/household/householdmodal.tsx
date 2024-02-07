import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export const PersonCombo = ({
  onPersonSelected,
}: {
  onPersonSelected?: (person: Person) => void;
}) => {
  const [prefixKeyword, setPrefixKeyword] = useState<string>("");
  const [personList, setPersonList] = useState<Person[]>([]);

  useEffect(() => {
    if (prefixKeyword.length > 3) {
      peopleService.search({ limit: 100, lastID: "", namePrefix: prefixKeyword }, {
        onSuccess: function (persons: Person[]): void {
          setPersonList(persons);
        },
        onError: function (err: any): void {
          console.log(err);
        }
      });
    }
  }, [prefixKeyword])
  
  return (
    <Autocomplete
      aria-label="household-member"
      placeholder="Search for someone..."
      onInputChange={(e) => setPrefixKeyword(e)}
      onKeyDown={(e: any) => e.continuePropagation()}
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

export const HouseholdModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const [isOnSearch, setIsOnSearch] = useState<boolean>(false);
  const [personList, setPersonList] = useState<Person[]>([]);
  const addPerson = (person: Person) => {
    setPersonList([...personList, person]);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent>
        {(onClose) => (
          <form>
            <ModalHeader>Household</ModalHeader>
            <ModalBody>
              <div>
                <Input label="Household Name" labelPlacement="inside" />
              </div>
              {/* <div>Profpic Dropzone Here</div> */}
              <div>{personList.map((person) => person.getFullName())
              }</div>
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
                  <Button color="primary" onClick={() => setIsOnSearch(true)}>
                    Add
                  </Button>
                )}
              </div>
            </ModalBody>
            <ModalFooter>Footer</ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
