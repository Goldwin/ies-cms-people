import { ChurchEvent } from "@/entities/attendance/events";
import { EventSchedule } from "@/entities/attendance/schedules";
import { fromAbsolute } from "@internationalized/date";
import { Button, ButtonGroup } from "@nextui-org/button";
import { DateValue } from "@nextui-org/calendar";
import { DatePicker } from "@nextui-org/date-picker";
import { Skeleton } from "@nextui-org/skeleton";
import { useEffect, useState } from "react";

export const ChurchEventHeader = ({
  eventSchedule,
  eventList,
  onEventSelectionChange,
  onCreateNextEvent,
}: {
  eventSchedule: EventSchedule | undefined;
  eventList: ChurchEvent[] | undefined;
  onEventSelectionChange: (s: ChurchEvent) => void;
  onCreateNextEvent: () => void;
}) => {
  const [dateValue, setDateValue] = useState<DateValue>(
    fromAbsolute(Date.now(), "UTC")
  );
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [focusedEvent, setFocusedEvent] = useState<ChurchEvent>();
  const [focusedEventIndex, setFocusedEventIndex] = useState<number>(0);

  useEffect(() => {
    setAvailableDates(
      eventList?.map(
        (event) =>
          event.startDate
            .add({ hours: eventSchedule?.timezoneOffset })
            .toString()
            .split("T")[0]
      ) || []
    );

    if (eventList) {
      let pos = 0;
      const now = Date.now();
      const countScore = (event: ChurchEvent): number => {
        return event.startDate.toDate().getTime() - now;
      };
      for (let i = 1; i < eventList?.length; i++) {
        if (countScore(eventList[i]) < 0) continue;
        if (countScore(eventList[i]) < countScore(eventList[pos])) {
          pos = i;
        }
      }
      setFocusedEventIndex(pos);
    }
  }, [eventList, eventSchedule]);

  useEffect(() => {
    if (eventList) {
      setFocusedEvent(eventList?.[focusedEventIndex]);
    }
  }, [eventList, focusedEventIndex]);

  useEffect(() => {
    if (focusedEvent) {
      onEventSelectionChange(focusedEvent);
      setDateValue(
        focusedEvent.startDate.add({ hours: eventSchedule?.timezoneOffset })
      );
    }
  }, [focusedEvent, onEventSelectionChange, eventSchedule]);

  const selectNextEvent = () => {
    setFocusedEventIndex((i) => Math.max(i - 1, 0));
  };

  const selectPrevEvent = () => {
    setFocusedEventIndex((i) => Math.min(i + 1, eventList?.length ?? 0));
  };

  const selectEventByDate = (date: DateValue) => {
    const selectedEventIndex = eventList?.findIndex(
      (event) =>
        event.startDate
          .add({ hours: eventSchedule?.timezoneOffset })
          .toString()
          .split("T")[0] === date.toString().split("T")[0]
    );
    if (selectedEventIndex !== undefined) {
      setFocusedEventIndex(selectedEventIndex);
    }
  };

  const isDateUnavailable = (date: DateValue): boolean => {
    return !availableDates.includes(date.toString().split("T")[0]);
  };

  return (
    <div className="flex flex-row mx-0 px-0 w-full bg-default-100">
      <div className="min-h-32 h-32 px-8 py-4 w-full">
        <Skeleton isLoaded={!!eventSchedule}>
          <div className="flex flex-row gap-4 align-middle">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl capitalize">{eventSchedule?.name}</h1>
              {eventList && eventList.length > 0 && (
                <div className="flex flex-row gap-2">
                  <ButtonGroup size="sm">
                    <Button
                      className="text-3xl"
                      onPress={selectPrevEvent}
                      isIconOnly
                    >
                      &#8249;
                    </Button>
                    <Button
                      className="text-3xl"
                      onPress={selectNextEvent}
                      isIconOnly
                    >
                      &#8250;
                    </Button>
                  </ButtonGroup>
                  <DatePicker
                    variant="faded"
                    aria-label="Session Date"
                    granularity="day"
                    value={dateValue}
                    onChange={selectEventByDate}
                    isDateUnavailable={isDateUnavailable}
                  />
                </div>
              )}
            </div>
          </div>
        </Skeleton>
      </div>
      <div className="flex flex-row gap-4 justify-end w-full">
        <div className="flex flex-col justify-end my-4 mx-4">
          {eventList && eventList.length > 0 && (
            <Button onPress={onCreateNextEvent}>Create Next Event</Button>
          )}
        </div>
      </div>
    </div>
  );
};
