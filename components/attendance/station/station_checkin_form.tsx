"use client";
import { ChurchEvent } from "@/entities/attendance/events";
import { HouseholdInfo } from "@/entities/attendance/person";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";

export interface StationCheckInFormProps {
  event?: ChurchEvent;
  household?: HouseholdInfo;
}

export const StationCheckInForm = (props: StationCheckInFormProps) => {
  return (
    <div>
      <CheckboxGroup>
        <Checkbox
          key={props.household?.householdHead.id}
          value={props.household?.householdHead.id}
        >
          {props.household?.householdHead.fullName}
        </Checkbox>
        {props.household?.members.map((member) => (
          <Checkbox key={member.id} value={member.id}>
            {member.fullName}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};
