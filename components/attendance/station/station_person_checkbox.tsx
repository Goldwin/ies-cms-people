import { PersonInfo } from "@/entities/attendance/person";
import { Checkbox, cn, Link, User } from "@nextui-org/react";

export interface PersonCheckboxProp {
  person?: PersonInfo;
}

export const StationPersonCheckbox = (props: PersonCheckboxProp) => {
  return (
    <Checkbox
      aria-label={props.person?.fullName}
      classNames={{
        base: cn(
          "inline-flex max-w-full w-full bg-content2 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
      value={props.person?.id}
    >
      <div className="w-full flex justify-between gap-2">
        <User
          avatarProps={{ size: "md", src: props.person?.profilePictureUrl }}
          name={props.person?.fullName}
        />
      </div>
    </Checkbox>
  );
};
