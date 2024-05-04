"use client";
import { ChurchEventHeader } from "@/components/attendance/events/eventheader";
import { SessionCheckInList } from "@/components/attendance/session/sessioncheckinlist";
import { ChurchEvent, ChurchEventSession } from "@/entities/attendance/events";
import { EventSchedule } from "@/entities/attendance/schedules";
import { eventSchedulesQuery } from "@/lib/queries/attendance";
import { Tab, Tabs } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventPage() {
  const param = useParams();
  const [churchEvent, setChurchEvent] = useState<EventSchedule>();
  const [churchEventSessions, setChurchEventSessions] = useState<
    ChurchEventSession[]
  >([]);
  const [selectedChurchEventSession, setSelectedChurchEventSession] =
    useState<ChurchEventSession>();
  useEffect(() => {
    console.log(param.schedule);
    eventSchedulesQuery
      .getEventSchedule(param.schedule as string)
      .then(setChurchEvent);
  }, [param]);

  return (
    <div className="flex flex-col items-center justify-start h-full w-full">
      <section className="flex w-full">
        <ChurchEventHeader
          eventSchedule={churchEvent}
          churchEventSessions={churchEventSessions}
          onChurchSessionSelectionChange={setSelectedChurchEventSession}
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
            <SessionCheckInList
              churchEventSession={selectedChurchEventSession}
              className="flex flex-col h-full w-full justify-start"
            />
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
          <Tab key="time" title="Times">
            Time setting
          </Tab>
          <Tab key="location" title="Labels & Locations">
            Location and label
          </Tab>
          <Tab key="settings" title="Settings">
            settings
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
