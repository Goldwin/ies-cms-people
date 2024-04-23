import { ChurchEvent, ChurchEventSession } from "@/entities/attendance/events";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { Button, ButtonGroup } from "@nextui-org/button";
import { DateValue } from "@nextui-org/calendar";
import { DatePicker } from "@nextui-org/date-picker";
import { Skeleton } from "@nextui-org/skeleton";
import { useEffect, useState } from "react";

export const ChurchEventHeader = ({
  churchEvent,
  churchEventSessions,
  onChurchSessionSelectionChange,
}: {
  churchEvent: ChurchEvent | undefined;
  churchEventSessions: ChurchEventSession[] | undefined;
  onChurchSessionSelectionChange: (s: ChurchEventSession) => void;
}) => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    setAvailableDates(
      churchEventSessions?.map((session) =>
        session.date.toLocaleDateString("sv-SE")
      ) || []
    );
  }, [churchEventSessions]);

  useEffect(() => {
    if (churchEventSessions)
      onChurchSessionSelectionChange(churchEventSessions?.[0]);
  });

  const isDateUnavailable = (s: DateValue) => {
    return !availableDates.includes(s.toString().split("T")[0]);
  };

  return (
    <div className="flex flex-row mx-0 px-0 w-full bg-default-100">
      <div className="min-h-32 h-32 px-8 py-4">
        <Skeleton isLoaded={!!churchEvent}>
          <div className="flex flex-row gap-4 align-middle">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl capitalize">{churchEvent?.name}</h1>
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
                  defaultValue={parseAbsoluteToLocal(
                    churchEventSessions
                      ?.map((session) => session.date.toISOString())
                      .find(() => true) ?? new Date().toISOString()
                  )}
                />
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
