import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export const HouseholdModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const fetchPerson = (value: string) => {
    if (value.length < 3) return;
    console.log(value);
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
              <div>
                <Autocomplete
                  aria-label="household-member"
                  placeholder="Search for someone..."
                  onInputChange={fetchPerson}
                  onKeyDown={(e: any) => e.continuePropagation()}
                >
                  <AutocompleteItem key="123">123</AutocompleteItem>
                  <AutocompleteItem key="456">456</AutocompleteItem>
                </Autocomplete>
              </div>
            </ModalBody>
            <ModalFooter>Footer</ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
