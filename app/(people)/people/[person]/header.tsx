import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  User,
} from "@nextui-org/react";
import { Key } from "react";

export const PersonHeader = ({ person }: { person: Person | undefined }) => {
  const deletePerson = (person: Person | undefined) => {
    if (person) {
      peopleService.delete(person.id).then((result) => {
        if (result) window.location.href = "/people";
      });
    }
  };

  const onAction = (key: Key) => {
    switch (key) {
      case "delete":
        deletePerson(person);
        break;
      case "merge":
        break;
      default:
        break;
    }
  };

  return (
    <section className="flex flex-row mx-0 px-0 w-full bg-default-100">
      <div className="min-h-32 h-32 px-8 py-4">
        <Skeleton isLoaded={!!person}>
          <div className="flex flex-row gap-4 align-middle">
            <User
              name={person?.getFullName()}
              classNames={{ name: "text-3xl px-4" }}
              avatarProps={{
                src: person?.profilePictureUrl,
                className: "w-24 h-24",
              }}
            />
            <div className="flex flex-col justify-center">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">Actions</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Application Menu" onAction={onAction}>
                  <DropdownItem key="delete">Delete Profile</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Skeleton>
      </div>
    </section>
  );
};
