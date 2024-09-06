"use client";
import { ChurchActivityAttendance } from "@/entities/attendance/attendance";
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
import { Controller, useForm } from "react-hook-form";

export interface StationCheckInFormProps {
  event?: ChurchEvent;
  household?: HouseholdInfo;
  onSuccess?: (attendances: ChurchActivityAttendance[]) => void;
}

interface PersonCheckInFormValue {
  personId: string;
  activityId: string;
  isCheckedIn: boolean;
  isVolunteer: boolean;
}

interface StationCheckInFormValue {
  eventId: string;
  checkInList: PersonCheckInFormValue[];
  checkInBy: string;
}

export const StationCheckInForm = (props: StationCheckInFormProps) => {
  const activities = props.event?.activities ?? [];
  const members = props.household
    ? [props.household.householdHead, ...props.household.members]
    : [];

  const { register, handleSubmit, control, watch } =
    useForm<StationCheckInFormValue>({
      defaultValues: {
        eventId: props.event?.id ?? "",
        checkInList: members.map((member) => ({
          personId: member.id,
          activityId: activities[0].id,
          isCheckedIn: false,
          isVolunteer: false,
        })),
      },
    });

  const checkInList = watch("checkInList");

  const onSubmit = (data: StationCheckInFormValue) => {
    console.log(data);
    props.onSuccess?.([]);
  };

  return (
    <form
      className="flex flex-col bg-default-50 w-[60%] h-full gap-4 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-medium">{props.household?.name} Household</h1>
      <Accordion
        variant="splitted"
        selectionMode="multiple"
        itemClasses={{
          base: "group-[.is-splitted]:bg-content2",
          content: "flex flex-row justify-between",
        }}
        selectedKeys={checkInList
          .filter((checkIn) => checkIn.isCheckedIn)
          .map((checkIn) => checkIn.personId)}
      >
        {members.map((member, i) => (
          <AccordionItem
            key={member.id}
            startContent={
              <Controller
                name={`checkInList.${i}.isCheckedIn`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    size="lg"
                    isSelected={field.value}
                    onChange={field.onChange}
                    name={`checkInList.${i}.isCheckedIn`}
                  >
                    <User
                      avatarProps={{
                        size: "md",
                        src: member.profilePictureUrl,
                      }}
                      name={member.fullName}
                    />
                  </Checkbox>
                )}
              />
            }
            textValue={member.fullName}
          >
            <Select
              className="max-w-64"
              aria-label="activity"
              label="Activity"
              defaultSelectedKeys={[activities[0].id]}
              {...register(`checkInList.${i}.activityId`)}
            >
              {activities.map((activity) => (
                <SelectItem
                  key={activity.id}
                  value={activity.id}
                  textValue={activity.name}
                >
                  {activity.name}
                </SelectItem>
              ))}
            </Select>
            <Controller
              name={`checkInList.${i}.isVolunteer`}
              control={control}
              render={({ field }) => (
                <Switch
                  aria-label="Is Volunteer"
                  {...register(`checkInList.${i}.isVolunteer`)}
                  isSelected={field.value}
                  onChange={field.onChange}
                >
                  Check-In as Volunteer
                </Switch>
              )}
            />
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex flex-row justify-between">
        <Select
          label="Check in By"
          aria-label="checkInBy"
          defaultSelectedKeys={[props.household?.householdHead.id ?? ""]}
          className="w-64"
          {...register("checkInBy")}
        >
          {members
            .filter((member) => member.isAdult)
            .map((member, i) => (
              <SelectItem
                key={member.id}
                value={member.id}
                textValue={member.fullName}
              >
                {member.fullName}
              </SelectItem>
            ))}
        </Select>
        <Button color="primary" size="lg" type="submit">
          Check In
        </Button>
      </div>
    </form>
  );
};
