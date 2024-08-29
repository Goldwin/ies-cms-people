import { Activity } from "@/entities/attendance/activity";
import {
  DailyEventSchedule,
  EventSchedule,
  EventScheduleType,
  OneTimeEventSchedule,
  WeeklyEventSchedule,
} from "@/entities/attendance/schedules";
import { eventScheduleCommands } from "@/lib/commands/attendance/schedules";
import {
  fromAbsolute,
  getLocalTimeZone,
  ZonedDateTime,
} from "@internationalized/date";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  Control,
  Controller,
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { Bounce, toast } from "react-toastify";

interface TimezoneOption {
  label: string;
  value: string;
}

interface IWeeklyScheduleConfigValue {
  days: string[];
}

interface IOneTimeScheduleConfigValue {
  date: ZonedDateTime;
}

interface IDailyScheduleConfigValue {
  startDate: ZonedDateTime;
  endDate: ZonedDateTime;
}

interface IEventConfigValue {
  id: string;
  name: string;
  type: EventScheduleType;
  timezone: string;
  schedule:
    | IWeeklyScheduleConfigValue
    | IOneTimeScheduleConfigValue
    | IDailyScheduleConfigValue;
}

const WeeklyScheduleConfigForm = ({
  register,
  watch,
  errors,
}: {
  register: UseFormRegister<IEventConfigValue>;
  watch: UseFormWatch<IEventConfigValue>;
  errors: FieldErrors<IEventConfigValue>;
}) => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <Card>
      <CardHeader>
        <h1 className="text-md">Weekly Schedule</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <CheckboxGroup
          label="Active Days"
          orientation="horizontal"
          defaultValue={watch("schedule.days").map((i) => i + "")}
        >
          {weekdays.map((day, index) => (
            <Checkbox
              key={index + 1 + ""}
              value={index + 1 + ""}
              {...register("schedule.days")}
            >
              {day}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </CardBody>
    </Card>
  );
};

const OneTimeScheduleConfigForm = ({
  control,
  errors,
}: {
  errors: FieldErrors<IEventConfigValue>;
  control: Control<IEventConfigValue>;
}) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-md">One Time Event Schedule</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <Controller
          name="schedule.date"
          control={control}
          render={({ field }) => {
            return (
              <DatePicker
                label="Event Date"
                {...field}
                isInvalid={!!(errors.schedule as any)?.date}
                errorMessage={(errors.schedule as any)?.date?.message}
                granularity="day"
              />
            );
          }}
          rules={{
            validate: (value) =>
              value.toDate().getTime() > Date.now() ||
              "Event date cannot be in the past",
          }}
        />
      </CardBody>
    </Card>
  );
};

const DailyScheduleConfigForm = ({
  control,
  errors,
}: {
  control: Control<IEventConfigValue>;
  errors: FieldErrors<IEventConfigValue>;
}) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-md">Daily Schedule</h1>
      </CardHeader>
      <Divider />
      <CardBody className="flex gap-4">
        <Controller
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              {...field}
              isInvalid={!!(errors.schedule as any)?.startDate}
              errorMessage={(errors.schedule as any)?.startDate?.message}
              granularity="day"
            />
          )}
          name="schedule.startDate"
          control={control}
          rules={{
            validate: (value, formValue) =>
              formValue.type !== EventScheduleType.Daily ||
              value.toDate().getTime() > Date.now() ||
              "Start date cannot be in the past",
          }}
        />
        <Controller
          render={({ field }) => (
            <DatePicker
              label="End Date"
              {...field}
              isInvalid={!!(errors.schedule as any)?.endDate}
              errorMessage={(errors.schedule as any)?.endDate?.message}
              granularity="day"
            />
          )}
          name="schedule.endDate"
          control={control}
          rules={{
            validate: {
              notInThePast: (value, formValue) =>
                formValue.type !== EventScheduleType.Daily ||
                value.toDate().getTime() > Date.now() ||
                "End date cannot be in the past",
              endDateIsGreaterThanStartDate: (value, formValue) =>
                formValue.type !== EventScheduleType.Daily ||
                value.toDate().getTime() >
                  (formValue.schedule as IDailyScheduleConfigValue).startDate
                    .toDate()
                    .getTime(),
            },
          }}
        />
      </CardBody>
    </Card>
  );
};

const ScheduleConfigForm = ({
  type,
  register,
  watch,
  control,
  errors,
}: {
  type: EventScheduleType;
  register: UseFormRegister<IEventConfigValue>;
  watch: UseFormWatch<IEventConfigValue>;
  control: Control<IEventConfigValue>;
  errors: FieldErrors<IEventConfigValue>;
}) => {
  switch (type) {
    case EventScheduleType.Daily:
      return <DailyScheduleConfigForm control={control} errors={errors} />;
    case EventScheduleType.Weekly:
      return (
        <WeeklyScheduleConfigForm
          register={register}
          watch={watch}
          errors={errors}
        />
      );
    case EventScheduleType.OneTime:
      return <OneTimeScheduleConfigForm control={control} errors={errors} />;
    default:
      return <div></div>;
  }
};

const toEventSchedule = (
  config: IEventConfigValue,
  activities: Activity[]
): EventSchedule => {
  if (config.type === EventScheduleType.Daily) {
    return new DailyEventSchedule({
      id: config.id,
      name: config.name,
      timezoneOffset: parseInt(config.timezone),
      startDate: (
        config.schedule as IDailyScheduleConfigValue
      ).startDate.toDate(),
      endDate: (config.schedule as IDailyScheduleConfigValue).endDate.toDate(),
      activities: activities,
    });
  }

  if (config.type === EventScheduleType.Weekly) {
    return new WeeklyEventSchedule({
      id: config.id,
      name: config.name,
      timezoneOffset: parseInt(config.timezone),
      days: (config.schedule as IWeeklyScheduleConfigValue).days.map((day) =>
        parseInt(day)
      ),
      activities: activities,
    });
  }

  if (config.type === EventScheduleType.OneTime) {
    return new OneTimeEventSchedule({
      id: config.id,
      name: config.name,
      timezoneOffset: parseInt(config.timezone),
      date: (config.schedule as IOneTimeScheduleConfigValue).date.toDate(),
      activities: activities,
    });
  }

  return new EventSchedule({
    id: config.id,
    name: config.name,
    timezoneOffset: parseInt(config.timezone),
    type: config.type,
    activities: activities,
  });
};

export const EventScheduleConfigForm = ({
  schedule,
  className = "w-full",
  onScheduleChange,
}: {
  schedule?: EventSchedule;
  className?: string;
  onScheduleChange?: (schedule: EventSchedule) => void;
  onError?: (error: Error) => void;
}) => {
  const timezoneOptions: TimezoneOption[] = [
    { label: "GMT +7", value: "7" },
    { label: "GMT +8", value: "8" },
    { label: "GMT +9", value: "9" },
  ];

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEventConfigValue>({
    mode: "onChange",
    defaultValues: {
      id: schedule?.id,
      name: schedule?.name,
      type: schedule?.type,
      timezone: schedule?.timezoneOffset + "",
      schedule: {
        days:
          (schedule as WeeklyEventSchedule)?.days?.map((day) => day + "") ?? [],
        date: fromAbsolute(
          (schedule as OneTimeEventSchedule)?.date?.getTime() ?? Date.now(),
          getLocalTimeZone()
        ),
        startDate: fromAbsolute(
          (schedule as DailyEventSchedule)?.startDate?.getTime() ?? Date.now(),
          getLocalTimeZone()
        ),
        endDate: fromAbsolute(
          (schedule as DailyEventSchedule)?.endDate?.getTime() ??
            Date.now() + 24 * 60 * 60 * 1000,
          getLocalTimeZone()
        ),
      },
    },
  });

  const update = (formSchedule: IEventConfigValue) => {
    const eventSchedule = toEventSchedule(
      formSchedule,
      schedule?.activities ?? []
    );
    eventScheduleCommands
      .updateEventSchedule(eventSchedule)
      .then((schedule) => {
        onScheduleChange?.(schedule);
        toast.success(`Event schedule "${schedule.name}" has been updated`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.error.message, {
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
    <div className={className}>
      <div className="flex flex-col gap-4 my-4 w-[70%]">
        <h1 className="text-2xl">Event Configuration</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(update)}>
          <Card>
            <CardHeader>
              <h1 className="text-md">General Settings</h1>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
              <input type="hidden" {...register("id")} />
              <Input
                type="text"
                label="Event Name"
                defaultValue={schedule?.name}
                {...register("name", {
                  minLength: {
                    value: 3,
                    message: "Event Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 63,
                    message: "Event Name must be at most 63 characters",
                  },
                })}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
              <Select
                label="Frequency"
                selectedKeys={[watch("type")]}
                {...register("type", {
                  validate: (value) =>
                    value === EventScheduleType.None
                      ? "Please select a frequency"
                      : undefined,
                })}
                isInvalid={!!errors.type}
                errorMessage={errors.type?.message}
              >
                {Object.keys(EventScheduleType).map((key) => (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </Select>
              <Select label="Timezone" {...register("timezone")}>
                {timezoneOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </CardBody>
          </Card>
          <ScheduleConfigForm
            type={watch("type")}
            register={register}
            watch={watch}
            control={control}
            errors={errors}
          />

          <div className="flex justify-end">
            <Button size="sm" color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
