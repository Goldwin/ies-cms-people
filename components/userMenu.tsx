import { logout } from "@/lib/commands/login";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import { ThemeSwitch } from "./theme-switch";

export const UserMenu = () => {
  return (
    <Dropdown aria-label="">
      <DropdownTrigger className="cursor-pointer">
        <Avatar></Avatar>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Menu">
        <DropdownItem
          onPress={() =>
            logout({
              onSuccess: function (result: void): void {
                try {
                  redirect("/");
                } catch (error) {
                  window.location.href = "/";
                }
              },
              onError: function (err: any): void {
                //TODO Toast
              },
            })
          }
        >
          Logout
        </DropdownItem>
        <DropdownItem>
          <ThemeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
