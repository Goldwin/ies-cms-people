"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Link,
} from "@nextui-org/react";
import { login } from "@/lib/commands/login";
import { redirect } from "next/navigation";
import { Bounce, toast } from "react-toastify";

interface ILoginInput {
  email: string;
  password: string;
}

const onSubmit: SubmitHandler<ILoginInput> = (data) =>
  login(data.email, data.password)
    .then((data) => {
      try {
        redirect("/");
      } catch (error) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      toast.error(error.response.data.error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
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
            isInvalid={!!errors.email}
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            errorMessage={errors.password && "Password is Required"}
            isInvalid={!!errors.password}
            {...register("password", { required: true })}
          />
          <div className="flex-row flex gap-4 justify-between">
            <Button
              className="w-full"
              color="secondary"
              href="/password/forgot"
              type="button"
              as={Link}
            >
              Forgot Password
            </Button>
            <Button className="w-full" type="submit" color="primary">
              Login
            </Button>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="justify-center">
          <p className="text-small">
            Don&apos;t Have an account yet?{" "}
            <Link
              href="/register"
              color="primary"
              className="hover:text-primary text-small"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
