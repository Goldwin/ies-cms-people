import { logout } from "@/lib/commands/auth/login";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { redirect } from "next/navigation";

export const UserMenu = () => {
  return (
    <Dropdown aria-label="">
      <DropdownTrigger>
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
                console.log("Failed to logout");
              },
            })
          }
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
