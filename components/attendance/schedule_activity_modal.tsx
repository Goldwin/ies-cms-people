"use client";

import { Activity } from "@/entities/attendance/activity";
import { EventSchedule } from "@/entities/attendance/schedules";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  TimeInput,
  TimeInputValue,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

interface IScheduleActivity {
  id?: string;
  name: string;
  timezone: number;
  startTime: string;
}

export const ScheduleActivityModal = ({
  isOpen,
  onOpenChange,
  activity,
  schedule
}: {
  isOpen: boolean;
  activity?: Activity;
  onOpenChange: () => void;
  schedule?: EventSchedule;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IScheduleActivity>({
    mode: "onSubmit",
    defaultValues: {
      name: activity?.name ?? "",
      timezone: activity?.timezoneOffset ?? 7,
    },
  });

  const {
    onChange: onStartTimeChange,
    onBlur: onStartTimeBlur,
    name: startTimeName,
    ref: startTimeRef,
  } = register("startTime", {
    required: "Start Time is Required",
  });
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <ModalHeader>Activity Details</ModalHeader>
            <ModalBody>
              <input type="hidden" value={activity?.id} {...register("id")} />
              <Input
                type="text"
                label="Activity Name"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                {...register("name", {
                  required: "Activity Name Is Required",
                })}
              />
              <TimeInput
                label="Start Time"
                onChange={(value: TimeInputValue) => {
                  onStartTimeChange({
                    target: {
                      name: startTimeName,
                      value: value.toString(),
                    },
                  });
                }}
                onBlur={onStartTimeBlur}
                name={startTimeName}
                ref={startTimeRef}
                isInvalid={!!errors.startTime}
                errorMessage={errors.startTime?.message}
              />
              <input type="hidden" value={schedule?.timezoneOffset} {...register("timezone")} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" color="primary">
                {activity ? "Update Activity" : "Create New Activity"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
