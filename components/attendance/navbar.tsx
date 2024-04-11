"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";

import { AppMenu } from "@/components/appMenu";
import { UserMenu } from "@/components/userMenu";

export const Navbar = ({ title }: { title: string }) => {
  return (
    <NextUINavbar maxWidth="full" position="sticky" className="bg-default-50">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <AppMenu title={title} />
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2"></ul>
      </NavbarContent>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <UserMenu />
      </NavbarContent>
    </NextUINavbar>
  );
};
