"use client";

import { ChurchEventCreationModal } from "@/components/attendance/events/eventmodal";
import { PencilIcon } from "@/components/icons";
import { ChurchEventStats } from "@/entities/attendance/events";
import { EventSchedule } from "@/entities/attendance/schedules";
import { EventScheduleSummary } from "@/entities/attendance/stats";
import {
  attendanceQuery,
  attendanceStatsQuery,
} from "@/lib/queries/attendance";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Skeleton, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ChurchEventAction = ({ churchEvent }: { churchEvent: EventSchedule }) => {
  return (
    <Link
      size="sm"
      href={"/attendance/events/" + churchEvent.id}
      className="hover:text-secondary"
    >
      <PencilIcon />
    </Link>
  );
};

export default function AttendancePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [churchEvents, setChurchEvents] = useState<EventSchedule[]>([]);
  const [focusedEventId, setFocusedEventId] = useState<string>();
  const [focusedEventStats, setFocusedEventStats] =
    useState<EventScheduleSummary>();

  useEffect(() => {
    attendanceStatsQuery.listEventSchedules("", 10).then(setChurchEvents);
  }, []);

  useEffect(() => {
    setFocusedEventId(churchEvents?.[0]?.id);
  }, [churchEvents]);

  useEffect(() => {
    if (focusedEventId) {
      attendanceStatsQuery
        .getEventStats(focusedEventId)
        .then(setFocusedEventStats);
    }
  }, [focusedEventId]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col items-center justify-start h-full w-full">
      <ChurchEventCreationModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <Navbar
        className="mx-0 px-0 w-full bg-default-100"
        maxWidth="full"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        position="static"
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">Events</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              className="justify-self-end"
              as={Link}
              color="primary"
              href="#"
              variant="flat"
              onPress={onOpen}
            >
              Add Event
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex flex-row items-center justify-start divide-x divide-default-100 h-full w-full">
        <Tabs
          isVertical
          size="lg"
          classNames={{
            wrapper: "w-full h-full flex flex-row divide-x divide-default-100",
            base: "flex w-[20%] h-full px-4 py-4",
            tabList: "w-full bg-transparent",
            tab: "w-full justify-start items-start px-4 data-[hover-unselected=true]:opacity-70",
            tabContent: "justify-center items-center capitalize w-full",
            panel: "w-full h-full col-start-3 flex w-[80%]",
          }}
          onSelectionChange={(id) => setFocusedEventId(id as string)}
        >
          {churchEvents.map((churchEvent) => (
            <Tab
              key={churchEvent.id}
              title={
                <div className="flex flex-row justify-between w-full">
                  <p className="flex">{churchEvent.name}</p>{" "}
                  <ChurchEventAction churchEvent={churchEvent} />
                </div>
              }
            >
              <Skeleton
                isLoaded={!!focusedEventStats}
                className="w-full h-full"
              >
                {focusedEventStats && (
                  <Chart
                    series={focusedEventStats.attendanceSeries}
                    type="bar"
                    options={{
                      xaxis: { categories: focusedEventStats.dateLabels },
                      chart: { id: "attendance", background: "transparent" },
                      title: {
                        text: _.capitalize(churchEvent?.name) + " Attendance",
                        align: "center",
                        style: {
                          fontSize: "18px",
                          fontWeight: "bold",
                        },
                      },
                      theme: { mode: "dark" },
                    }}
                  />
                )}
              </Skeleton>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
