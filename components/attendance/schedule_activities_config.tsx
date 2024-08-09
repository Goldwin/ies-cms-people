import { Activity } from "@/entities/attendance/activity";
import { EventSchedule } from "@/entities/attendance/schedules";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { Table, TableCell, TableColumn, TableRow } from "@nextui-org/table";
import { TableBody, TableHeader } from "react-stately";
import { ScheduleActivityModal } from "./schedule_activity_modal";
import { useState } from "react";
import { ButtonWithPrompt } from "../common/prompt";

export const EventScheduleActivityConfigForm = ({
  eventSchedule,
  className = "flex flex-col h-full w-full justify-start",
  onScheduleChange,
}: {
  eventSchedule?: EventSchedule;
  className?: string;
  onScheduleChange: (schedule: EventSchedule) => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

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
          onPress={() => {
            setSelectedActivity(activity);
            onOpen();
          }}
        >
          Edit
        </Button>
        <ButtonWithPrompt
          size="sm"
          color="danger"
          message={`Are you sure you want to delete "${activity.name}" activity?`}
          title="Delete Activity Confirmation"
          aria-label={`Delete Activity ${activity.id}`}
          onConfirm={() => {
            console.log("Delete Activity", activity.id);
          }}
        >
          Delete
        </ButtonWithPrompt>
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
          onPress={() => {
            setSelectedActivity(undefined);
            onOpen();
          }}
          aria-label="New Activity"
        >
          New Activity
        </Button>
        <ScheduleActivityModal
          isOpen={isOpen}
          onScheduleChange={onScheduleChange}
          onOpenChange={onOpenChange}
          schedule={eventSchedule}
          activity={selectedActivity}
        />
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
