"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { resetPassword } from "@/lib/commands/login";

interface IResetEmailInput {
  email: string;
}

const onSubmit: SubmitHandler<IResetEmailInput> = (data) =>
  resetPassword(data.email);

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetEmailInput>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

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
            errorMessage={errors.email && "Email is Required"}
            {...register("email", { required: true })}
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
