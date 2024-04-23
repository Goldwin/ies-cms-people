"use client";

import { ChurchEventList } from "@/components/attendance/events/eventlist";
import { ChurchEventCreationModal } from "@/components/attendance/events/eventmodal";
import { ChurchEvent, ChurchEventStats } from "@/entities/attendance/events";
import { attendanceQuery } from "@/lib/queries/attendance";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Skeleton, useDisclosure } from "@nextui-org/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function AttendancePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [churchEvents, setChurchEvents] = useState<ChurchEvent[]>([]);
  const [focusedEvent, setFocusedEvent] = useState<ChurchEvent>();
  const [focusedEventStats, setFocusedEventStats] =
    useState<ChurchEventStats>();

  useEffect(() => {
    attendanceQuery.listChurchEvents("", 10).then(setChurchEvents);
  }, []);

  useEffect(() => {
    setFocusedEvent(churchEvents?.[0]);
  }, [churchEvents]);

  useEffect(() => {
    if (focusedEvent) {
      attendanceQuery
        .getChurchEventStats(focusedEvent.id, {
          startDate: new Date(),
          endDate: new Date(),
        })
        .then(setFocusedEventStats);
    }
  }, [focusedEvent]);

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
        <div className="flex flex-col h-full w-[20%]">
          <ChurchEventList
            churchEvents={churchEvents}
            focusedEventId={focusedEvent?.id ?? ""}
            onSelectionChange={setFocusedEvent}
          />
        </div>
        <div className="flex flex-row h-full w-full">
          <Skeleton isLoaded={!!focusedEventStats} className="w-full h-full">
            {focusedEventStats && (
              <Chart
                series={[
                  {
                    data: focusedEventStats.attendanceCount,
                    name: "Attendance",
                  },
                ]}
                type="bar"
                options={{
                  xaxis: { categories: focusedEventStats.dateLabels },
                  chart: { id: "attendance", background: "transparent" },
                  title: {
                    text: _.capitalize(focusedEvent?.name) + " Attendance",
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
          <div></div>
        </div>
      </div>
    </div>
  );
}
