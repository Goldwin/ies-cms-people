import {
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
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent>
        {(onClose) => (
          <form>
            <ModalHeader></ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter></ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
