"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";

import { AppMenu } from "@/components/appMenu";
import { UserMenu } from "@/components/userMenu";
import { siteConfig } from "@/config/site";

import { usePathname } from "next/navigation";
import { Link } from "@nextui-org/react";

enum Module {
  EVENTS = "Events",
  LABELS = "Labels",
  UNKNOWN = "unknown",
}

function getModule(pathName: string): Module {
  if (
    pathName.startsWith("/attendance/events") ||
    pathName.endsWith("/attendance")
  ) {
    return Module.EVENTS;
  } else if (pathName.startsWith("/attendance/labels")) {
    return Module.LABELS;
  } else {
    return Module.UNKNOWN;
  }
}

export const Navbar = ({ title }: { title: string }) => {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <NextUINavbar maxWidth="full" position="static" className="bg-default-50">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <AppMenu title={title} />
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.attendanceNavItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={`font-medium ${
                  getModule(pathName) === item.label ? "bg-foreground/10 rounded-full" : "after:rounded-full"
                }`}
                size="md"
                color="foreground"
                href={item.href}
                isBlock
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <UserMenu />
      </NavbarContent>
    </NextUINavbar>
  );
};
