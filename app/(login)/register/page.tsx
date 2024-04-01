"use client";
import appService from "@/services/cms";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Progress,
} from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";

interface IRegistrationInput {
  email: string;
  otp: string;
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;
  confirmPassword: string;
}

const EmailConfirmationStage = (
  nextStage: () => void,
  handleSubmit: any,
  register: any,
  errors: any
): any => {
  const onSubmit: SubmitHandler<IRegistrationInput> = (data) => {
    appService.requestRegistrationOTP(data.email).then(() => {
      console.log(data);
      nextStage();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p className="text-sm">Step 1, Enter your Email</p>
      <Input
        type="email"
        label="Email"
        placeholder="Enter your email"
        errorMessage={errors.email?.message}
        {...register("email", {
          required: "Email is Required",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "Invalid email address",
          },
        })}
      />
      <div className="flex-row flex gap-4 justify-between">
        <Button className="w-full" type="submit" color="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

const OTPConfirmationStage = (
  nextStage: () => void,
  handleSubmit: any,
  register: any,
  errors: any
): any => {
  const onSubmit: SubmitHandler<IRegistrationInput> = (data) => {
    console.log(data);
    nextStage();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p className="text-sm">Step 2, Enter your OTP</p>
      <Input
        type="otp"
        label="OTP"
        placeholder="Enter OTP sent to your email"
        errorMessage={errors.otp?.message}
        {...register("otp", {
          required: "Otp is Required",
        })}
      />
      <div className="flex-row flex gap-4 justify-between">
        <Button className="w-full" type="submit" color="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

const RegistrationStage = (
  nextStage: () => void,
  handleSubmit: any,
  register: UseFormRegister<IRegistrationInput>,
  errors: any
): any => {
  console.log("registering");
  const onSubmit: SubmitHandler<IRegistrationInput> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p className="text-sm">Step 3, Enter your basic information</p>
      <div className="flex flex-row gap-4">
        <Input
          type="text"
          label="First Name"
          placeholder="Enter your first name"
          errorMessage={errors.firstName?.message}
          {...register("firstName", {
            required: "Name is Required",
          })}
        />

        <Input
          type="text"
          label="middle Name"
          placeholder="Enter your middle name"
          errorMessage={errors.middleName?.message}
          {...register("middleName")}
        />

        <Input
          type="text"
          label="Last Name"
          placeholder="Enter your last name"
          errorMessage={errors.lastName?.message}
          {...register("lastName", {
            required: "Name is Required",
          })}
        />
      </div>

      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        errorMessage={errors.password?.message}
        {...register("password", {
          required: "Password is Required",
        })}
      />

      <Input
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          validate: (value: string, formValue: IRegistrationInput) =>
            value === formValue.password || "Passwords do not match",
        })}
      />

      <div className="flex-row flex gap-4 justify-between">
        <Button className="w-full" type="submit" color="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

const CompletionStage = () => {};

export default function RegisterPage() {
  const [stage, setStage] = useState(1);
  const stagesComponent = [
    EmailConfirmationStage,
    OTPConfirmationStage,
    RegistrationStage,
    CompletionStage,
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationInput>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const nextStage = () => setStage(stage + 1);
  return (
    <Card
      className="flex w-full flex-wrap md:flex-nowrap w-[48rem] mx-[-8rem] px-8 py-4 justify-center"
      fullWidth={true}
    >
      <CardHeader className="pb-0 pt-2 flex-col items-start">
        <h1 className="text-2xl">Registration</h1>
      </CardHeader>

      <CardBody className="gap-4">
        {stagesComponent[stage](nextStage, handleSubmit, register, errors)}
      </CardBody>
      <CardFooter>
        {/* <Progress size="lg" value={25 * (stage + 1)}></Progress> */}
      </CardFooter>
    </Card>
  );
}
