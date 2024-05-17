import { Activity } from "@/entities/attendance/activity";
import { EventSchedule } from "@/entities/attendance/schedules";
import { Table, TableCell, TableColumn, TableRow } from "@nextui-org/table";
import { TableBody, TableHeader } from "react-stately";

export const EventScheduleActivitiesConfig = ({
  eventSchedule,
  className,
}: {
  eventSchedule?: EventSchedule;
  className?: string;
}) => {
  const columns: { label: string; key: string }[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "time",
      label: "Time",
    },
    {
      key: "timezoneOffset",
      label: "Timezone Offset",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  const cellMapping = (key: string, activity: Activity) => {
    if (key !== "actions") {
      return activity.toGenericObject()[key];
    }
    return <div>Action Nih</div>;
  };

  return (
    <div className={className + " py-4 gap-4"}>
      <h1 className="text-2xl">Activities</h1>
      {eventSchedule && (
        <Table align="center">
          <TableHeader columns={columns}>
            {(column) => <TableColumn>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody>
            {eventSchedule.activities.map((activity) => (
              <TableRow key={activity.id}>
                {(columnKey) => (
                  <TableCell>
                    {cellMapping(columnKey.toString(), activity)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
