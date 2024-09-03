"use client";
import { ChurchEvent } from "@/entities/attendance/events";
import { HouseholdInfo } from "@/entities/attendance/person";
import { CheckboxGroup } from "@nextui-org/checkbox";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { StationPersonCheckbox } from "./station_person_checkbox";

export interface StationCheckInFormProps {
  event?: ChurchEvent;
  household?: HouseholdInfo;
}

export const StationCheckInForm = (props: StationCheckInFormProps) => {
  if (props.household === undefined) {
    return <></>;
  }
  const members = [props.household.householdHead, ...props.household.members];
  return (
    <div className="flex flex-col bg-default-50 w-[60%] h-full gap-4 p-4">
      <h1 className="text-xl font-medium">{props.household?.name} Household</h1>
      <CheckboxGroup
        classNames={{
          base: "w-full",
        }}
      >
        {props.event &&
          members.map((member) => (
            <StationPersonCheckbox
              key={member.id}
              person={member}
              event={props.event}
            />
          ))}
      </CheckboxGroup>
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
