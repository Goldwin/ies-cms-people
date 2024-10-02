import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

export const ButtonWithPrompt = ({
  color,
  size,
  title,
  message,
  children,
  onConfirm = () => {},
}: {
  size?: "sm" | "md" | "lg";
  title?: string;
  message?: string;
  children?: ReactNode;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  onConfirm?: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button color={color} onPress={onOpen} size={size}>
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{title}</ModalHeader>
              <ModalBody>{message}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  Yes
                </Button>
                <Button color="secondary" onPress={onClose}>
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
