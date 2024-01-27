"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";

import { AppNav } from "./appnav";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="full" position="sticky" className="bg-default-50">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <AppNav />
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2"></ul>
      </NavbarContent>
    </NextUINavbar>
  );
};
