"use client";
import { Logo, ChevronDownIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export const AppNav = ({
  title = "Church Management System",
}: {
  title?: string;
}) => {
  const trigger = (
    <span className="flex justify-start items-center gap-1 cursor-pointer">
      <Logo />
      <p className="font-bold text-inherit">{title}</p>
      <ChevronDownIcon />
    </span>
  );

  return (
    <Dropdown>
      <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu>
        {siteConfig.appNavItems.map((item) => (
          <DropdownItem key={item.key} href={item.href}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
