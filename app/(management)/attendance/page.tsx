"use client";

import { ChurchEventList } from "@/components/attendance/events/eventlist";
import { ChurchEvent } from "@/entities/attendance/events";
import { attendanceQuery } from "@/lib/queries/attendance";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { useEffect, useState } from "react";

export default function AttendancePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [churchEvents, setChurchEvents] = useState<ChurchEvent[]>([]);
  const [focusedEvent, setFocusedEvent] = useState<ChurchEvent>();

  useEffect(() => {
    attendanceQuery.ListChurchEvents("", 10).then(setChurchEvents);
  }, []);

  useEffect(() => {
    setFocusedEvent(churchEvents?.[0]);
  }, [churchEvents]);

  useEffect(() => {
    //get focused event detail
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
        <div className="col-start-2 col-end-9 h-full flex-row">
          <div>{focusedEvent?.name} detail and edit icon</div>
          <div>{focusedEvent?.name} summary chart</div>
        </div>
      </div>
    </div>
  );
}
