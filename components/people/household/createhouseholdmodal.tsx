import { Household } from "@/entities/people/household";
import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

interface HouseholdCreationRequest {
  name: string;
  memberPersonIds: string[];
  headPersonId: string;
}

export const CreateHouseholdModal = ({
  isOpen,
  householdHead,
  onOpenChange,
  onSuccess = () => {},
}: {
  isOpen: boolean;
  householdHead?: Person;
  onOpenChange: () => void;
  onSuccess?: (household: Household) => void;
}) => {
  const { register, handleSubmit } = useForm<HouseholdCreationRequest>({
    mode: "onSubmit",
  });
  const createHousehold = (request: HouseholdCreationRequest) => {
    peopleService.createHousehold(request).then((household) => {
      if (household) onSuccess(household);
      onOpenChange();
    });
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(createHousehold)}>
            <ModalHeader>Household</ModalHeader>
            <ModalBody>
              <Input type="text" label="Household Name" {...register("name")} />
              <input
                type="hidden"
                {...register("headPersonId")}
                defaultValue={householdHead?.id}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
