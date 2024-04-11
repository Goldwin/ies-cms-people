"use client";

import { Button } from "@nextui-org/button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { useState } from "react";

export default function AttendancePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar
        className="mx-0 px-0 w-full bg-default-100"
        maxWidth="full"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        position="static"
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">Events</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              className="justify-self-end"
              as={Link}
              color="primary"
              href="#"
              variant="flat"
              onPress={() => {}}
            >
              Add Event
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="grid grid-cols-8 items-center justify-center divide-x h-full w-full">
        <div className="col-start-1 col-end-3">event list</div>
        <div className="col-start-3 col-end-9">report</div>
      </div>
    </div>
  );
}
