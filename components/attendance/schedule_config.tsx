import {
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

interface IEventConfigValue {
  name: string;
  type: EventScheduleType;
  timezone: number;
  schedule: IWeeklyScheduleConfigValue | IOneTimeScheduleConfigValue;
}

const WeeklyScheduleConfigForm = ({
  register,
  watch,
}: {
  register: UseFormRegister<IEventConfigValue>;
  watch: UseFormWatch<IEventConfigValue>;
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
  register,
  control,
}: {
  register: UseFormRegister<IEventConfigValue>;
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

const ScheduleConfigForm = ({
  type,
  register,
  watch,
  control,
}: {
  type: EventScheduleType;
  register: UseFormRegister<IEventConfigValue>;
  watch: UseFormWatch<IEventConfigValue>;
  control: Control<IEventConfigValue>;
}) => {
  if (type === EventScheduleType.Weekly) {
    return <WeeklyScheduleConfigForm register={register} watch={watch} />;
  }
  if (type === EventScheduleType.OneTime) {
    return <OneTimeScheduleConfigForm register={register} control={control} />;
  }
  return <div></div>;
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
                {...register("name")}
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
