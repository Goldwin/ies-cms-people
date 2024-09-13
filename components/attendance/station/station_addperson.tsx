import { HouseholdPicker } from "@/components/attendance/station/station_household_picker";
import { HouseholdInfo, PersonInfo } from "@/entities/attendance/person";
import { personCommands } from "@/lib/commands/attendance/person";
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
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

enum FormStage {
  HouseholdSelectionMode = 0,
  CreateHousehold = 1,
  SearchExistingHousehold = 2,
  AddNewPersonInfo = 3,
}

const stageTitles = [
  "Select Household",
  "Create New Household",
  "Search Existing Household",
  "Add Your Info",
];

interface HouseholdData {
  id?: string;
  name: string;
  headId?: string;
  memberIds?: string[];
  isNewHousehold: boolean;
}

interface PersonData {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  birthday: string;
  anniversary: string;
  gender: string;
  maritalStatus: string;
}

interface StageProp {
  stage: FormStage;
  household?: HouseholdData;
  setStage: (stage: FormStage) => void;
  setHousehold: (household: HouseholdData) => void;
  onComplete: (person: PersonInfo) => void;
  onError: (err: any) => void;
  onCancel: () => void;
}

const HouseholdSelectionMode = (props: StageProp) => {
  return (
    <div className="flex flex-row gap-4">
      <Card
        className="bg-default-100 w-64 h-64"
        isPressable
        onPress={() => {
          console.log("Create Household");
          props.setStage(FormStage.CreateHousehold);
        }}
      >
        <CardBody className="text-center text-large flex flex-col justify-center">
          New Household
        </CardBody>
      </Card>
      <Card
        isPressable
        className="bg-default-100 w-64 h-64"
        onPress={() => {
          props.setStage(FormStage.SearchExistingHousehold);
        }}
      >
        <CardBody className="text-center text-large flex flex-col justify-center">
          Add to Existing Household
        </CardBody>
      </Card>
    </div>
  );
};

const CreateHouseholdForm = (props: StageProp) => {
  const [isValid, setIsValid] = useState(true);
  const onCreateHousehold = () => {
    if (!props.household || props.household?.name === "") {
      setIsValid(false);
      return;
    }
    props.setStage(FormStage.AddNewPersonInfo);
  };
  const onCancel = () => {
    props.setHousehold({ id: undefined, name: "", isNewHousehold: false });
    props.setStage(FormStage.HouseholdSelectionMode);
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        label="Household Name"
        value={props.household?.name}
        onChange={(e) => {
          setIsValid(true);
          props.setHousehold({ name: e.target.value, isNewHousehold: true });
        }}
        isInvalid={!isValid}
        errorMessage="Household name is required"
      />
      <div className="flex flex-row justify-end gap-4">
        <Button type="button" onPress={onCancel}>
          Cancel
        </Button>
        <Button type="button" color="primary" onPress={onCreateHousehold}>
          Create Household
        </Button>
      </div>
    </div>
  );
};

const AddPersonForm = (props: StageProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonData>();
  console.log(props.household);
  const genders = ["Male", "Female"];
  const maritalStatus = ["Single", "Married"];
  const cancel = () => {
    props.setHousehold({ id: "", name: "", isNewHousehold: false });
    props.setStage(FormStage.HouseholdSelectionMode);
  };
  const createPerson = (data: PersonData) => {
    personCommands
      .addPerson({
        household: props.household!!,
        person: data,
      })
      .then((person: PersonInfo) => {
        props.onComplete(person);
      })
      .catch((err) => {});
  };
  return (
    <form
      className="flex flex-col w-full gap-4"
      onSubmit={handleSubmit(createPerson)}
    >
      <div className="flex flex-row gap-4">
        <Input
          label="First Name"
          errorMessage={errors.firstName?.message}
          isInvalid={!!errors.firstName}
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
          isInvalid={!!errors.lastName}
        />
      </div>
      <div className="flex flex-row">
        <Input
          label="Email Address"
          errorMessage={errors.emailAddress?.message}
          {...register("emailAddress", {
            pattern: {
              value: /$|^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          isInvalid={!!errors.emailAddress}
        />
      </div>
      <div className="flex flex-col">
        <Input
          label="Phone Number"
          errorMessage={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />
      </div>
      <div className="flex flex-col">
        <Input
          label="Address"
          errorMessage={errors.address?.message}
          {...register("address")}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Input
          label="Birthday"
          type="date"
          errorMessage={errors.birthday?.message}
          placeholder="mm/dd/yyyy"
          {...register("birthday")}
          isInvalid={!!errors.birthday}
        />
        <Input
          label="Anniversary"
          type="date"
          errorMessage={errors.anniversary?.message}
          placeholder="mm/dd/yyyy"
          {...register("anniversary")}
          isInvalid={!!errors.anniversary}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Select
          label="Gender"
          errorMessage={errors.gender?.message}
          isInvalid={!!errors.gender}
          {...register("gender")}
        >
          {genders.map((gender) => (
            <SelectItem key={gender} value={gender.toUpperCase()}>
              {gender}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Marital Status"
          {...register("maritalStatus")}
          errorMessage={errors.maritalStatus?.message}
          isInvalid={!!errors.maritalStatus}
        >
          {maritalStatus.map((status) => (
            <SelectItem key={status} value={status.toUpperCase()}>
              {status}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-row justify-end gap-4">
        <Button type="button" onPress={props.onCancel}>
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Add
        </Button>
      </div>
    </form>
  );
};

const SearchExistingHouseholdForm = (props: StageProp) => {
  const [isValid, setIsValid] = useState(true);
  const next = () => {
    if (!props.household || !props.household.id || props.household.id === "") {
      setIsValid(false);
      return;
    }
    props.setStage(FormStage.AddNewPersonInfo);
  };
  const setHousehold = (household: HouseholdInfo) => {
    setIsValid(true);
    props.setHousehold({
      id: household.id,
      name: household.name,
      headId: household.householdHead.id,
      memberIds: household.members.map((member) => member.id),
      isNewHousehold: false,
    });
  };

  const resetHousehold = () => {
    props.setHousehold({ id: "", name: "", isNewHousehold: false });
  };
  return (
    <div className="flex flex-col w-full gap-4">
      <HouseholdPicker
        onHouseholdSelected={setHousehold}
        onHouseholdUnselected={resetHousehold}
        isInvalid={!isValid}
        errorMessage="Please select a household"
      />
      <div className="flex flex-row w-full justify-end gap-4">
        <Button type="button" onPress={props.onCancel}>
          Cancel
        </Button>
        <Button type="button" onPress={next} color="primary">
          Next
        </Button>
      </div>
    </div>
  );
};

const FormByStage = (props: StageProp) => {
  switch (props.stage) {
    case FormStage.HouseholdSelectionMode:
      return <HouseholdSelectionMode {...props} />;
    case FormStage.CreateHousehold:
      return <CreateHouseholdForm {...props} />;
    case FormStage.SearchExistingHousehold:
      return <SearchExistingHouseholdForm {...props} />;
    case FormStage.AddNewPersonInfo:
      return <AddPersonForm {...props} />;
  }
};

interface AddPersonModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const AddPersonModalForm = (props: AddPersonModalProps) => {
  const [stage, setStage] = useState<FormStage>(
    FormStage.HouseholdSelectionMode
  );
  const [household, setHousehold] = useState<HouseholdData>();
  const onClose = () => {
    setHousehold({ id: "", name: "", isNewHousehold: false });
    setStage(FormStage.HouseholdSelectionMode);
  };
  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      onClose={onClose}
      size="xl"
      isDismissable={false}
    >
      <ModalContent>
        {(close) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              {stageTitles[stage]}
            </ModalHeader>
            <ModalBody className="gap-4 flex flex-row justify-between items-center">
              <FormByStage
                {...{
                  stage,
                  setStage,
                  household,
                  setHousehold,
                  onComplete: (person: PersonInfo) => {
                    toast.success(`Successfully added ${person.fullName}`, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      transition: Bounce,
                    });
                    close();
                  },
                  onError: () => {
                    toast.error("Failed to add person. Please try again", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      transition: Bounce,
                    });
                  },
                  onCancel: () => {
                    setHousehold({ id: "", name: "", isNewHousehold: false });
                    setStage(FormStage.HouseholdSelectionMode);
                    close();
                  },
                }}
              />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
