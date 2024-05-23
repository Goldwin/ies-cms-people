"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";

export const ChurchEventCreationModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const frequencyTypes = ["Weekly", "Daily"];
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form>
            <ModalHeader>New Event</ModalHeader>
            <ModalBody>
              <Input type="text" label="Event Name" />
              <Select label="Frequency">
                {frequencyTypes.map((type) => (
                  <SelectItem key={type}>{type}</SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Create
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
