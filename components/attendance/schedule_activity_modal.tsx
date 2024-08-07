"use client";

import { Activity } from "@/entities/attendance/activity";
import { EventSchedule } from "@/entities/attendance/schedules";
import { eventScheduleActivityCommands } from "@/lib/commands/attendance/activities";
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
import { Bounce, toast } from "react-toastify";

interface IScheduleActivity {
  id?: string;
  name: string;
  startTime: string;
}

export const ScheduleActivityModal = ({
  isOpen,
  onScheduleChange: onScheduleUpdated,
  onOpenChange,
  activity,
  schedule,
}: {
  isOpen: boolean;
  activity?: Activity;
  onScheduleChange: (schedule: EventSchedule) => void;
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

  const saveActivity = (data: IScheduleActivity) => {
    console.log(data);
    const updatedActivity = new Activity({
      id: activity?.id ?? "",
      name: data.name,
      scheduleId: schedule?.id ?? "",
      timeHour: parseInt(data.startTime.split(":")[0]),
      timeMinute: parseInt(data.startTime.split(":")[1]),
      timezoneOffset: schedule?.timezoneOffset ?? 7,
    });

    if (updatedActivity.id === "") {
      eventScheduleActivityCommands
        .createEventScheduleActivity(updatedActivity)
        .then((result) => {
          onOpenChange();
          toast(`New Activity ${updatedActivity.name} Created`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
          });
          onScheduleUpdated(result);
        })
        .catch((e: any) => {
          toast(e.response.data.error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
          });
        });
    } else {
      eventScheduleActivityCommands
        .updateEventScheduleActivity(updatedActivity)
        .then((result) => {
          onOpenChange();
          toast(`Activity ${updatedActivity.name} Updated`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
          });
          onScheduleUpdated(result);
        })
        .catch((e: any) => {
          toast(e.response.data.error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
          });
        });
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(saveActivity)}>
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
