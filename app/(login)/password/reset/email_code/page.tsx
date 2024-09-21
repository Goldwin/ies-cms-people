"use client";
import { resetPassword } from "@/lib/commands/login";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface IResetPasswordInput {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("login");
  const code = searchParams.get("code");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordInput>({
    mode: "onChange",
    defaultValues: {
      email: email ?? "",
      code: code ?? "",
    },
  });

  const onSubmit: SubmitHandler<IResetPasswordInput> = (data) => {
    resetPassword(data.email, data.code, data.password).then(() => {
      window.location.href = "/login";
    });
  };
  return (
    <Card className="flex w-full flex-wrap md:flex-nowrap w-96 px-8 py-4">
      <CardHeader className="pb-0 pt-2 flex-col items-start">
        <h1 className="text-2xl">Reset Password</h1>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="gap-4">
          <Input
            type="password"
            label="New Password"
            placeholder="New Password"
            errorMessage={errors.password?.message}
            autoComplete="new-password"
            isInvalid={!!errors.password}
            {...register("password", {
              required: "New Password is Required",
            })}
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Confirm Password is Required",
              deps: ["password"],
              validate: {
                equalToPassword: (value, values) => {
                  if (value !== values.password) {
                    return "Passwords do not match";
                  }
                },
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
