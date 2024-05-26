"use client";
import { EventScheduleActivityConfigForm } from "@/components/attendance/schedule_activities_config";
import { EventCheckInList } from "@/components/attendance/event_attendance_list";
import { ChurchEventHeader } from "@/components/attendance/event_schedule_header";
import { ChurchEvent } from "@/entities/attendance/events";
import { EventSchedule } from "@/entities/attendance/schedules";
import { eventQuery } from "@/lib/queries/attendance/event";
import { eventSchedulesQuery } from "@/lib/queries/attendance/event_schedules";
import { Tab, Tabs } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EventScheduleConfigForm } from "@/components/attendance/schedule_config";

export default function EventPage() {
  const param = useParams();
  const [eventSchedule, setEventSchedule] = useState<EventSchedule>();
  const [churchEventList, setChurchEventList] = useState<ChurchEvent[]>([]);
  const [selectedChurchEvent, setSelectedChurchEvent] = useState<ChurchEvent>();
  useEffect(() => {
    eventSchedulesQuery
      .getEventSchedule(param.schedule as string)
      .then(setEventSchedule);
  }, [param]);

  useEffect(() => {
    if (eventSchedule) {
      eventQuery.listEvents(eventSchedule.id, "", 10).then(setChurchEventList);
    }
  }, [eventSchedule]);

  return (
    <div className="flex flex-col items-center justify-start h-full w-full">
      <section className="flex w-full">
        <ChurchEventHeader
          eventSchedule={eventSchedule}
          eventList={churchEventList}
          onEventSelectionChange={setSelectedChurchEvent}
        />
      </section>
      <section className="flex w-full h-full ">
        <Tabs
          isVertical
          radius="none"
          size="lg"
          classNames={{
            wrapper: "w-full h-full flex flex-row divide-x divide-default-100",
            base: "flex w-[20%] h-full px-4 py-4",
            tabList: "w-full bg-transparent",
            tab: "w-full justify-start items-start px-4 data-[disabled=true]:opacity-100 data-[disabled=true]:cursor-default",
            tabContent: "justify-center items-center",
            panel: "w-full h-full col-start-3 flex w-[80%]",
          }}
        >
          <Tab key="overview" title="Overview">
            <h1>Overview</h1>
          </Tab>
          <Tab key="check-in" title="Check-in">
            <EventCheckInList churchEvent={selectedChurchEvent} />
          </Tab>
          <Tab key="report" title="Report">
            Generate Report
          </Tab>
          <Tab
            key="configuration-title"
            title={
              <p className="cursor-default text-default-900">Configuration</p>
            }
            className="mt-4 px-0 cursor-default"
            isDisabled={true}
          ></Tab>
          <Tab key="date" title="Settings">
            <EventScheduleConfigForm schedule={eventSchedule} />
          </Tab>
          <Tab key="time" title="Activities">
            <EventScheduleActivityConfigForm eventSchedule={eventSchedule} />
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
