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

const getAddPersonSubmitHandler = (output: Output<Person>) => {
  return (person: Person) => {
    peopleService.add(person, output);
  };
};

const getUpdatePersonSubmitHandler = (output: Output<Person>) => {
  return (person: Person) => {
    peopleService.update(person.id, person, output);
  };
};

export const PersonModal = ({
  isOpen,
  onOpenChange,
  person,
  callback,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  person?: Person;
  callback?: (person: Person) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Person>({
    mode: "onSubmit",
  });

  const [submissionResult, setSubmissionResult] = useState<SubmissionResult>();

  const isUpdate = !!person;
  const output = {
    onSuccess: function (v: Person): void {
      setSubmissionResult({
        success: true,
        message: `Successfully ${
          isUpdate ? "updated" : "added"
        } ${v.getFullName()}'s profile`,
      });
    },
    onError: function (err: any): void {
      const x = {
        success: false,
        message: `Failed to ${
          isUpdate ? "update" : "add"
        } ${person?.getFullName()}'s profile`,
      };
      setSubmissionResult(x);
    },
  };

  const onSubmit: SubmitHandler<Person> = isUpdate
    ? getUpdatePersonSubmitHandler(output)
    : getAddPersonSubmitHandler(output);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              {isUpdate ? "Update Profile" : "Add Profile"}
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
                <input value={person?.id} {...register("id")} type="hidden" />
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
                  value={person?.firstName}
                />
                <Input
                  label="Middle Name"
                  {...register("middleName")}
                  value={person?.middleName}
                />
                <Input
                  label="Last Name"
                  errorMessage={errors.lastName?.message}
                  value={person?.lastName}
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
                  value={person?.emailAddress}
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
                <Input
                  label="Phone Number"
                  value={person?.phoneNumber}
                  {...register("phoneNumber")}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label="Address"
                  value={person?.address}
                  {...register("address")}
                />
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
                {isUpdate ? "Update" : "Add"}
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
