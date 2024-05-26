import {
  EventSchedule,
  EventScheduleType,
} from "@/entities/attendance/schedules";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

interface TimezoneOption {
  label: string;
  value: number;
}

export const ScheduleConfigForm = ({
  schedule,
  className,
}: {
  schedule?: EventSchedule;
  className?: string;
}) => {
  const timezoneOptions: TimezoneOption[] = [
    { label: "GMT +7", value: 7 },
    { label: "GMT +8", value: 8 },
    { label: "GMT +9", value: 9 },
  ];
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 my-4 w-[70%]">
        <h1 className="text-2xl">Event Configuration</h1>
        <form className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <h1 className="text-xl">Basic Information</h1>
            </CardHeader>
            <CardBody className="gap-4">
              <Input
                type="text"
                label="Event Name"
                defaultValue={schedule?.name}
              />
              <Select
                label="Frequency"
                defaultSelectedKeys={[schedule?.type as string]}
              >
                {Object.keys(EventScheduleType).map((key) => (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Timezone"
                defaultSelectedKeys={schedule?.timezoneOffset + ""}
                // isInvalid={!!errors.timezone}
                // errorMessage={errors.timezone?.message}
                // {...register("timezone", {
                //   required: true,
                // })}
              >
                {timezoneOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </CardBody>
          </Card>
          <div className="flex justify-end">
            <Button size="sm" color="primary" type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
