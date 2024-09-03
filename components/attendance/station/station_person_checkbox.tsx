import { ChurchEvent } from "@/entities/attendance/events";
import { PersonInfo } from "@/entities/attendance/person";
import {
  Checkbox,
  cn,
  Link,
  Select,
  SelectItem,
  User,
} from "@nextui-org/react";
import { useEffect } from "react";

export interface PersonCheckboxProp {
  person: PersonInfo;
  event?: ChurchEvent;
}

export const StationPersonCheckbox = (props: PersonCheckboxProp) => {
  const activities = props.event?.activities ?? [];
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
        <Select
          className="max-w-64"
          aria-label="activity"
          label="Activity"
          defaultSelectedKeys={[activities[0].id]}
        >
          {activities.map((activity) => (
            <SelectItem key={activity.id} value={activity.id}>
              {activity.name}
            </SelectItem>
          ))}
        </Select>
      </div>
    </Checkbox>
  );
};
