"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { login } from "@/commands/auth/login";
import { redirect } from "next/navigation";

interface ILoginInput {
  email: string;
  password: string;
}

const onSubmit: SubmitHandler<ILoginInput> = (data) =>
  login(data.email, data.password, {
    onSuccess: function (v: void): void {
      try {
        redirect("/");
      } catch (error) {
        console.log(error);
        window.location.href = "/";
      }
    },
    onError: function (err: any): void {
      console.log(err);
    },
  });

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-96">
      <Card className="flex w-full flex-wrap md:flex-nowrap w-96 px-8 py-4">
        <CardHeader className="pb-0 pt-2 flex-col items-start">
          <h1 className="text-2xl">Login</h1>
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
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              errorMessage={errors.password && "Password is Required"}
              {...register("password", { required: true })}
            />
            <Button className="w-full" type="submit" color="primary">
              Login
            </Button>
          </CardBody>
        </form>
      </Card>
    </div>
  );
}
