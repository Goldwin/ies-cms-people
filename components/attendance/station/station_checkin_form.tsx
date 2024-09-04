"use client";
import { ChurchEvent } from "@/entities/attendance/events";
import { HouseholdInfo } from "@/entities/attendance/person";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import {
  Accordion,
  AccordionItem,
  Button,
  Select,
  SelectItem,
  Switch,
  User,
} from "@nextui-org/react";

export interface StationCheckInFormProps {
  event?: ChurchEvent;
  household?: HouseholdInfo;
}

export const StationCheckInForm = (props: StationCheckInFormProps) => {
  if (props.household === undefined || props.event === undefined) {
    return <></>;
  }

  const activities = props.event?.activities ?? [];
  const members = [props.household.householdHead, ...props.household.members];
  return (
    <div className="flex flex-col bg-default-50 w-[60%] h-full gap-4 p-4">
      <h1 className="text-xl font-medium">{props.household?.name} Household</h1>
      <Accordion
        variant="splitted"
        selectionMode="multiple"
        itemClasses={{
          base: "group-[.is-splitted]:bg-content2",
          content: "flex flex-row justify-between",
        }}
      >
        {members.map((member) => (
          <AccordionItem
            key={member.id}
            startContent={
              <Checkbox value={member.id} size="lg">
                <User
                  avatarProps={{ size: "md", src: member.profilePictureUrl }}
                  name={member.fullName}
                />
              </Checkbox>
            }
          >
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
            <Switch aria-label="Is Volunteer">Check-In as Volunteer</Switch>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex flex-row justify-between">
        <Select
          label="Check In By"
          defaultSelectedKeys={[props.household.householdHead.id]}
          className="w-64"
        >
          {members
            .filter((member) => member.isAdult)
            .map((member, i) => (
              <SelectItem key={member.id} value={member.id}>
                {member.fullName}
              </SelectItem>
            ))}
        </Select>
        <Button color="primary" size="lg">
          Check In
        </Button>
      </div>
    </div>
  );
};
