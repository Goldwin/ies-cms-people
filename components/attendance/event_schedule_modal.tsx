"use client";

import {
  EventSchedule,
  EventScheduleType,
} from "@/entities/attendance/schedules";
import { eventScheduleCommands } from "@/lib/commands/attendance/schedules";
import { TIMEZONE_OPTIONS } from "@/lib/common/timezone";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

export const ChurchEventCreationModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchedule>({
    mode: "onSubmit",
  });
  const createSchedule = (input: EventSchedule) => {
    const schedule = new EventSchedule({
      id: input.id,
      name: input.name,
      type: input.type,
      activities: [],
      timezoneOffset: parseInt(input.timezoneOffset + ""), //react hook form unable to bind it as number
    });
    eventScheduleCommands
      .createEventSchedule(schedule)
      .then((result) => {
        console.log(result);
        window.location.href = "/attendance/schedules/" + result.id;
      })
      .catch((e) => {
        console.log(e);
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
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(createSchedule)}>
            <ModalHeader>New Event</ModalHeader>
            <ModalBody>
              <Input type="text" label="Event Name" {...register("name")} />
              <Select
                label="Timezone"
                {...register("timezoneOffset", {
                  required: "Timezone is required",
                  setValueAs: (value) => parseInt(value),
                })}
                errorMessage={errors.timezoneOffset?.message}
                isInvalid={!!errors.timezoneOffset}
              >
                {TIMEZONE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
              <input
                type="hidden"
                {...register("type", { value: "None" as EventScheduleType })}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Create
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
