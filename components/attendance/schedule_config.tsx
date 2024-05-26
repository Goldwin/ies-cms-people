import {
  DailyEventSchedule,
  EventSchedule,
  EventScheduleType,
  OneTimeEventSchedule,
  WeeklyEventSchedule,
} from "@/entities/attendance/schedules";
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

interface TimezoneOption {
  label: string;
  value: number;
}

interface IWeeklyScheduleConfigValue {
  days: number[];
}

interface IOneTimeScheduleConfigValue {
  date: ZonedDateTime;
}

interface IDailyScheduleConfigValue {
  startDate: ZonedDateTime;
  endDate: ZonedDateTime;
}

interface IEventConfigValue {
  name: string;
  type: EventScheduleType;
  timezone: number;
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
          render={({ field }) => <DatePicker label="Event Date" {...field} />}
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
  console.log(errors.schedule);
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

export const EventScheduleConfigForm = ({
  schedule,
  className = "w-full",
}: {
  schedule?: EventSchedule;
  className?: string;
}) => {
  const timezoneOptions: TimezoneOption[] = [
    { label: "GMT +7", value: 7 },
    { label: "GMT +8", value: 8 },
    { label: "GMT +9", value: 9 },
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
      name: schedule?.name,
      type: schedule?.type,
      timezone: schedule?.timezoneOffset,
      schedule: {
        days: (schedule as WeeklyEventSchedule)?.days ?? [],
        date:
          (schedule as OneTimeEventSchedule)?.date ??
          fromAbsolute(Date.now(), getLocalTimeZone()),
        startDate:
          (schedule as DailyEventSchedule)?.startDate ??
          fromAbsolute(Date.now(), getLocalTimeZone()),
        endDate:
          (schedule as DailyEventSchedule)?.endDate ??
          fromAbsolute(Date.now() + 24 * 60 * 60 * 1000, getLocalTimeZone()),
      },
    },
  });

  return (
    <div className={className}>
      <div className="flex flex-col gap-4 my-4 w-[70%]">
        <h1 className="text-2xl">Event Configuration</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <Card>
            <CardHeader>
              <h1 className="text-md">General Settings</h1>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
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
              <Select label="Frequency" {...register("type")}>
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
