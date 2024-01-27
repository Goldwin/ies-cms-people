import { Person } from "@/entities/people/person";
import { Skeleton, User } from "@nextui-org/react";

export const PersonHeader = ({ person }: { person: Person | undefined }) => {
  return (
    <section className="flex flex-row mx-0 px-0 w-full bg-default-100">
      <div className="min-h-32 h-32 px-8 py-4">
        <Skeleton isLoaded={!!person}>
          <User
            name={person?.getFullName()}
            classNames={{ name: "text-3xl px-4" }}
            avatarProps={{
              src: person?.profilePictureUrl,
              className: "w-24 h-24",
            }}
          />
        </Skeleton>
      </div>
    </section>
  );
};
