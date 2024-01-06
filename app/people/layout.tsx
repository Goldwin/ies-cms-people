'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button, Link, useDisclosure } from "@nextui-org/react";
import { PersonModal } from "./personmodal";
import { useRef } from "react";
import { Person } from "@/entities/people/person";

export default function PeopleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const person = useRef<Person>()
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	return (
		<>
			<Navbar className="mx-0 px-0 w-full bg-gray-800" maxWidth="full">
				<NavbarBrand>
					<p className="font-bold text-inherit">Church Member</p>
				</NavbarBrand>
				<NavbarContent justify="end">
					<NavbarItem>
						<Button className="justify-self-end" as={Link} color="primary" href="#" variant="flat" onPress={onOpen}>
							Add Member					
						</Button>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
			<PersonModal isOpen={isOpen} onOpenChange={onOpenChange} person={person.current}/>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-max text-center justify-center">
					{children}
				</div>
			</section>
		</>
		
	);
}
