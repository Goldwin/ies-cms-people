"use client";

import { ChurchEventList } from "@/components/attendance/events/eventlist";
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
        .getChurchEventStats(focusedEvent.id)
        .then(setFocusedEventStats);
    }
  }, [focusedEvent]);

  return (
    <div className="flex flex-col items-center justify-start h-full w-full">
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
              onPress={() => {}}
            >
              Add Event
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="grid grid-cols-8 items-center justify-start divide-x divide-default-100 h-full w-full">
        <ChurchEventList
          churchEvents={churchEvents}
          focusedEventId={focusedEvent?.id ?? ""}
          onSelectionChange={setFocusedEvent}
        />
        <div className="col-start-2 col-end-9 flex-row">
          <div>
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
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
