import { Activity } from "@/entities/attendance/activity";
import { EventSchedule } from "@/entities/attendance/schedules";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { Table, TableCell, TableColumn, TableRow } from "@nextui-org/table";
import { TableBody, TableHeader } from "react-stately";
import { ScheduleActivityModal } from "./schedule_activity_modal";


export const EventScheduleActivityConfigForm = ({
  eventSchedule,
  className="flex flex-col h-full w-full justify-start",
}: {
  eventSchedule?: EventSchedule;
  className?: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const columns: { label: string; key: string }[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "startTime",
      label: "Start Time",
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
    return (
      <div className="flex flex-row gap-2">
        <Button
          size="sm"
          color="primary"
          aria-label={`Edit Activity ${activity.id}`}
        >
          Edit
        </Button>
        <Button
          size="sm"
          color="danger"
          aria-label={`Delete Activity ${activity.id}`}
        >
          Delete
        </Button>
      </div>
    );
  };

  return (
    <div className={className + " py-4 gap-4"}>
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl">Activities</h1>
        <Button
          size="sm"
          color="primary"
          onPress={onOpen}
          aria-label="New Activity"
        >
          New Activity
        </Button>
        <ScheduleActivityModal isOpen={isOpen} onOpenChange={onOpenChange} schedule={eventSchedule}/>
      </div>
      {eventSchedule && (
        <Table align="center" aria-label="Event Schedule Activities">
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
