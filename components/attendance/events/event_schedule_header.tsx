import { ChurchEvent } from "@/entities/attendance/events";
import { EventSchedule } from "@/entities/attendance/schedules";
import { Button, ButtonGroup } from "@nextui-org/button";
import { DateValue } from "@nextui-org/calendar";
import { DatePicker } from "@nextui-org/date-picker";
import { Skeleton } from "@nextui-org/skeleton";
import { useEffect, useState } from "react";

export const ChurchEventHeader = ({
  eventSchedule,
  eventList,
  onEventSelectionChange,
}: {
  eventSchedule: EventSchedule | undefined;
  eventList: ChurchEvent[] | undefined;
  onEventSelectionChange: (s: ChurchEvent) => void;
}) => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [focusedEvent, setFocusedEvent] = useState<ChurchEvent>();

  useEffect(() => {
    setAvailableDates(
      eventList?.map((event) => event.date.toString().split("T")[0]) || []
    );
  }, [eventList]);

  useEffect(() => {
    if (eventList) {
      setFocusedEvent(eventList?.[0]);
      onEventSelectionChange(eventList?.[0]);
    }
  }, [onEventSelectionChange, eventList]);

  const isDateUnavailable = (s: DateValue) => {
    return !availableDates.includes(s.toString().split("T")[0]);
  };

  return (
    <div className="flex flex-row mx-0 px-0 w-full bg-default-100">
      <div className="min-h-32 h-32 px-8 py-4">
        <Skeleton isLoaded={!!eventSchedule}>
          <div className="flex flex-row gap-4 align-middle">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl capitalize">{eventSchedule?.name}</h1>
              <div className="flex flex-row gap-2">
                <ButtonGroup size="sm">
                  <Button className="text-3xl" isIconOnly>
                    &#8249;
                  </Button>
                  <Button className="text-3xl" isIconOnly>
                    &#8250;
                  </Button>
                </ButtonGroup>
                <DatePicker
                  variant="faded"
                  aria-label="Session Date"
                  granularity="day"
                  isDateUnavailable={isDateUnavailable}
                  defaultValue={focusedEvent?.date}
                />
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
