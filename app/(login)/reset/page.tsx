"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { forgotPassword } from "@/lib/commands/login";
import { useState } from "react";

interface IForgotPasswordInput {
  email: string;
}

export default function ForgotPasswordPage() {
  const [resetPasswordStage, setResetPasswordStage] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordInput>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IForgotPasswordInput> = (data) => {
    forgotPassword(data.email).then(() => setResetPasswordStage(1));
  };
  if (resetPasswordStage > 0) {
    return (
      <Card className="flex w-full flex-wrap md:flex-nowrap w-96 px-8 py-4 justify-center bg-success-50">
        <CardHeader className="justify-center">
          <h1 className="text-xl text-center">Reset password email sent</h1>
        </CardHeader>

        <CardBody className="gap-4">
          <p className="text-center text-small">
            You should soon receive an email allowing you to reset your
            password. Please make sure to check your spam and trash if you
            can&apos;t find the email
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="flex w-full flex-wrap md:flex-nowrap w-96 px-8 py-4">
      <CardHeader className="pb-0 pt-2 flex-col items-start">
        <h1 className="text-2xl">Reset Password</h1>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="gap-4">
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
              Reset
            </Button>
          </div>
        </CardBody>
      </form>
    </Card>
  );
}
