import { title } from "@/components/primitives";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";

export default function LoginPage() {
	return (
		<div className="flex justify-center items-center h-96">
			<Card className="flex w-full flex-wrap md:flex-nowrap w-96 px-8 py-4">
				<CardHeader className="pb-0 pt-2 flex-col items-start">
					<h1 className="text-2xl">Login</h1>
				</CardHeader>
				<CardBody className="gap-4">					
					<Input type="email" label="Email" placeholder="Enter your email"/>
					<Input type="password" label="Password" placeholder="Enter your password" />					
					<div className="flex flex-row justify-between">
						<Button className="justify-self-start" color="secondary">Forgot Password</Button>
						<Button className="justify-self-end" type="submit" color="primary">Login</Button>					
					</div>					
				</CardBody>      	
			</Card>
		</div>
	);
}
