import { EventSchedule } from "@/entities/attendance/schedules";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import Image from "next/image";

export const EventGetStarted = ({
  schedule,
  onConfigureScheduleSelected,
  onCreateEventSelected,
}: {
  schedule?: EventSchedule;
  onConfigureScheduleSelected?: () => void;
  onCreateEventSelected?: () => void;
}) => {
  return (
    <div className="flex mx-4 my-4 w-full justify-center">
      <Card className="flex w-[50%] h-[50%] my-[5%]">
        <CardHeader className="flex-row p-4">
          <h1 className="text-2xl">Let&#39;s Create Your First Event</h1>
        </CardHeader>
        <CardBody className="flex-col">
          <div className="flex flex-row p-4 gap-8 h-full">
            <div className="flex-col justify-begin">
              <Image
                src="/event.svg"
                width={160}
                height={160}
                alt={"Event Icon"}
              />
            </div>
            <div className="flex flex-col">
              <p>Hello</p>
              <p>
                <b>{schedule?.name}</b> event schedule doesn&#39;t have an event
                instance yet
              </p>
              <p>To get things started, follow these three simple steps:</p>
              <div className="my-4">
                <ol className="list-decimal list-inside">
                  <li>Configure the Event Schedule</li>
                  <li>Configure Event Activities</li>
                  <li>Create First Event</li>
                </ol>
              </div>
              <div className="flex gap-4">
                <Button onPress={onConfigureScheduleSelected}>
                  Configure Schedule
                </Button>
                <Button onPress={onCreateEventSelected}>
                  Create First Event
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
