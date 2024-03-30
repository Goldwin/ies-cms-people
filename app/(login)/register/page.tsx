"use client";

// import { Button } from "@nextui-org/button";
// import { Card, CardBody, CardHeader } from "@nextui-org/card";
// import { Input } from "@nextui-org/input";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";

// interface IRegisterEmail {
//   email: string;
// }

// const components = [
//   ({ next }: { next: () => void }) => {
//     const {
//       register,
//       handleSubmit,
//       formState: { errors },
//     } = useForm<IRegisterEmail>({
//       mode: "onChange",
//       defaultValues: {
//         email: "",
//       },
//     });

//     const onSubmit: SubmitHandler<IRegisterEmail> = (data) => {};

//     return (
//       <Card className="flex w-full flex-wrap md:flex-nowrap w-96 px-8 py-4">
//         <CardHeader className="pb-0 pt-2 flex-col items-start">
//           <h1 className="text-2xl">Register</h1>
//         </CardHeader>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <CardBody className="gap-4">
//             <Input
//               type="email"
//               label="Email"
//               placeholder="Enter your email"
//               errorMessage={errors.email?.message}
//               {...register("email", {
//                 required: "Email is Required",
//                 pattern: {
//                   value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//                   message: "Invalid email address",
//                 },
//               })}
//             />
//             <div className="flex-row flex gap-4 justify-between">
//               <Button className="w-full" type="submit" color="primary">
//                 Register
//               </Button>
//             </div>
//           </CardBody>
//         </form>
//       </Card>
//     );
//   },
//   ({ next }: { next: () => void }) => {},
// // ];

// export default function RegisterPage() {
//   const [stage, setStage] = useState(0);

//   const next = () => setStage(stage + 1);
//   return components[stage]({ next });
// }

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
import { SubmitHandler, useForm } from "react-hook-form";

interface IRegistrationInput {
  email: string;
  otp: string;
  name: string;
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
  register: any,
  errors: any
): any => {
  console.log("registering");
  const onSubmit: SubmitHandler<IRegistrationInput> = (data) => {
    console.log(data);
    nextStage();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="info"
        label="infooo"
        placeholder="Enter your information"
        errorMessage={errors.name?.message}
        {...register("name", {
          required: "Name is Required",
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
    <Card className="flex w-full flex-wrap md:flex-nowrap w-96 px-8 py-4 justify-center">
      <CardHeader className="pb-0 pt-2 flex-col items-start">
        <h1 className="text-2xl">Register</h1>
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
