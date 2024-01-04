import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button, Link } from "@nextui-org/react";

export default function PeopleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar className="mx-0">
				<NavbarBrand>
					<p className="font-bold text-inherit">Church Member</p>
				</NavbarBrand>
				<NavbarContent justify="end">
					<NavbarItem>
						<Button as={Link} color="primary" href="#" variant="flat">
							Add Member					
						</Button>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-max text-center justify-center">
					{children}
				</div>
			</section>
		</>
		
	);
}
