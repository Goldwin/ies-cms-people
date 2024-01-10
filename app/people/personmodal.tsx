import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const genders = ["Male", "Female"];
const maritalStatus = ["Single", "Married"];

interface SubmissionResult {
  success: boolean;
  message: string;
}

export const PersonModal = ({
  isOpen,
  onOpenChange,
  person,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  person?: Person;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Person>({
    mode: "onSubmit",
  });

  const [submissionResult, setSubmissionResult] = useState<SubmissionResult>();

  const onSubmit: SubmitHandler<Person> = (data) =>
    peopleService.add(data, {
      onSuccess: function (v: Person): void {
        setSubmissionResult({
          success: true,
          message: "Successfully added " + v.getFullName() + "'s profile",
        });
      },
      onError: function (err: any): void {
        const x = { success: false, message: "Failed to add profile" };
        setSubmissionResult(x);
      },
    });
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              {person ? "Update Profile" : "Add Profile"}
              <div>
                {submissionResult && (
                  <Card className="items-center">
                    <CardBody
                      className={
                        submissionResult.success
                          ? "bg-success-200"
                          : "bg-danger-200"
                      }
                    >
                      {submissionResult.message}
                    </CardBody>
                  </Card>
                )}
              </div>
            </ModalHeader>
            <ModalBody className="gap-4">
              <div className="flex flex-row gap-4">
                <Input
                  label="First Name"
                  errorMessage={errors.firstName?.message}
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 3,
                      message: "First Name must be at least 3 characters",
                    },
                  })}
                />
                <Input label="Middle Name" {...register("middleName")} />
                <Input
                  label="Last Name"
                  errorMessage={errors.lastName?.message}
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 3,
                      message: "Last Name must be at least 3 characters",
                    },
                  })}
                />
              </div>
              <div className="flex flex-row">
                <Input
                  label="Email Address"
                  errorMessage={errors.emailAddress?.message}
                  {...register("emailAddress", {
                    required: "Email Address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              <div className="flex flex-col">
                <Input label="Phone Number" {...register("phoneNumber")} />
              </div>
              <div className="flex flex-col">
                <Input label="Address" {...register("address")} />
              </div>
              <div className="flex flex-row gap-4">
                <Input
                  label="Birthday"
                  type="date"
                  placeholder="mm/dd/yyyy"
                  {...register("birthday")}
                />
                <Input
                  label="Anniversary"
                  type="date"
                  placeholder="mm/dd/yyyy"
                  {...register("anniversary")}
                />
              </div>
              <div className="flex flex-row gap-4">
                <Select label="Gender" {...register("gender")}>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender.toUpperCase()}>
                      {gender}
                    </SelectItem>
                  ))}
                </Select>
                <Select label="Marital Status" {...register("maritalStatus")}>
                  {maritalStatus.map((status) => (
                    <SelectItem key={status} value={status.toUpperCase()}>
                      {status}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Update
              </Button>
              <Button color="danger" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
