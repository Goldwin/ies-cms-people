"use client";

import { TrashIcon } from "@/components/icons";
import { Activity, ActivityLabel } from "@/entities/attendance/activity";
import { AttendanceType } from "@/entities/attendance/attendance";
import { Label } from "@/entities/attendance/label";
import { EventSchedule } from "@/entities/attendance/schedules";
import { eventScheduleActivityCommands } from "@/lib/commands/attendance/activities";
import { Time } from "@internationalized/date";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  TimeInput,
  TimeInputValue,
} from "@nextui-org/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { Bounce, Icons, toast } from "react-toastify";

interface IActivityLabel {
  labelId: string;
  attendanceTypes: string[];
  quantity: number;
}

interface IScheduleActivity {
  id?: string;
  name: string;
  startTime: string;
  labels: IActivityLabel[];
}

const LabelOption = ({
  labels,
  index,
  register,
  onRemove,
  control,
  error,
}: {
  labels: Label[];
  index: number;
  register: UseFormRegister<IScheduleActivity>;
  onRemove: () => void;
  control: Control<IScheduleActivity>;
  error: FieldErrors<IScheduleActivity>;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between w-full gap-4">
        <Select
          label="Select Label"
          {...register(`labels.${index}.labelId`, {
            required: { value: true, message: "Label is required" },
          })}
          isInvalid={!!error.labels?.[index]?.labelId?.message}
          errorMessage={error.labels?.[index]?.labelId?.message}
        >
          {labels.map((label) => (
            <SelectItem key={label.id} value={label.id}>
              {label.name}
            </SelectItem>
          ))}
        </Select>
        <Button
          isIconOnly
          className="font-extrabold"
          onClick={onRemove}
          color="danger"
        >
          <TrashIcon color="red" onClick={onRemove} />
        </Button>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          {...register(`labels.${index}.quantity`)}
          label="Quantity"
          type="number"
          {...register(`labels.${index}.quantity`, {
            valueAsNumber: true,
            required: true,
            min: { value: 1, message: "Quantity must be at least 1" },
            max: { value: 10, message: "Quantity must be at most 10" },
          })}
          isInvalid={!!error.labels?.[index]?.quantity?.message}
          errorMessage={error.labels?.[index]?.quantity?.message}
        />
        <Controller
          control={control}
          name={`labels.${index}.attendanceTypes`}
          render={({ field }) =>
            field.value && (
              <CheckboxGroup
                label="Attendance Types"
                value={field.value}
                onChange={field.onChange}
                orientation="horizontal"
              >
                {Object.values(AttendanceType).map((type, i) => (
                  <Checkbox key={i} value={type}>
                    {type}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )
          }
        />
      </CardBody>
    </Card>
  );
};

const LabelSelection = ({
  control,
  availableLabels,
  register,
  currentLabel,
  error,
}: {
  control: Control<IScheduleActivity, any>;
  availableLabels: Label[];
  currentLabel: IActivityLabel[];
  register: UseFormRegister<IScheduleActivity>;
  error: FieldErrors<IScheduleActivity>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "labels",
    shouldUnregister: true,
  });
  useEffect(() => {
    if (fields.length === 0 && currentLabel.length > 0) {
      append(currentLabel);
    }
  }, [fields, append, currentLabel]);
  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <LabelOption
          key={field.id}
          labels={availableLabels}
          index={index}
          register={register}
          onRemove={() => remove(index)}
          error={error}
          control={control}
        />
      ))}
      {fields.length < 4 && (
        <Button
          onClick={() =>
            append({ labelId: "", quantity: 1, attendanceTypes: [] })
          }
        >
          Add Label
        </Button>
      )}
    </div>
  );
};

export const ScheduleActivityModal = ({
  isOpen,
  onScheduleChange: onScheduleUpdated,
  onOpenChange,
  activity,
  availableLabels,
  schedule,
}: {
  isOpen: boolean;
  activity?: Activity;
  onScheduleChange: (schedule: EventSchedule) => void;
  onOpenChange: () => void;
  availableLabels: Label[];
  schedule?: EventSchedule;
}) => {
  const currentLabel =
    activity?.labels.map((label) => {
      return {
        labelId: label.labelId,
        attendanceTypes: label.attendanceTypes,
        quantity: label.quantity,
      };
    }) ?? [];
  console.log(currentLabel);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IScheduleActivity>({
    mode: "onSubmit",
    defaultValues: {
      name: activity?.name ?? "",
      startTime: activity
        ? `${activity.hour}:${activity.minute}`
        : `${new Date().getHours()}:${new Date().getMinutes()}`,
      labels: currentLabel,
    },
  });

  const labelMap = availableLabels.reduce(
    (acc: { [key: string]: Label }, label) => {
      acc[label.id] = label;
      return acc;
    },
    {}
  );

  const {
    onChange: onStartTimeChange,
    onBlur: onStartTimeBlur,
    name: startTimeName,
    ref: startTimeRef,
  } = register("startTime", {
    required: "Start Time is Required",
  });

  useEffect(() => {
    reset({
      name: activity?.name ?? "",
      startTime: activity
        ? `${activity.hour}:${activity.minute}`
        : `${new Date().getHours()}:${new Date().getMinutes()}`,
    });
  }, [reset, activity]);

  const saveActivity = (data: IScheduleActivity) => {
    const updatedActivity = new Activity({
      id: activity?.id ?? "",
      name: data.name,
      scheduleId: schedule?.id ?? "",
      labels: data.labels.map((label: IActivityLabel) => {
        return new ActivityLabel({
          labelId: label.labelId,
          labelName: labelMap[label.labelId].name,
          type: labelMap[label.labelId].type,
          quantity: label.quantity,
          attendanceTypes: label.attendanceTypes,
        });
      }),
      timeHour: parseInt(data.startTime.split(":")[0]),
      timeMinute: parseInt(data.startTime.split(":")[1]),
      timezoneOffset: schedule?.timezoneOffset ?? 7,
    });

    console.log(updatedActivity);

    if (updatedActivity.id === "") {
      eventScheduleActivityCommands
        .createEventScheduleActivity(updatedActivity)
        .then((result) => {
          onOpenChange();
          toast.success(
            `New Activity "${updatedActivity.name}" has been created`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Bounce,
            }
          );
          onScheduleUpdated(result);
        })
        .catch((e: any) => {
          toast.error(e.response.data.error.message, {
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
          toast.success(`Activity ${updatedActivity.name} Updated`, {
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
          toast.error(e.response.data.error.message, {
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
                defaultValue={activity?.name ?? ""}
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
                defaultValue={
                  new Time(activity?.hour ?? 0, activity?.minute ?? 0)
                }
                isInvalid={!!errors.startTime}
                errorMessage={errors.startTime?.message}
              />
              <Divider />
              <h2 className="text-lg font-bold">Labels</h2>
              <LabelSelection
                register={register}
                control={control}
                availableLabels={availableLabels}
                currentLabel={currentLabel}
                error={errors}
              />
              <Divider />
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
