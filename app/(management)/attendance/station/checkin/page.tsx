"use client";
import { StationCheckInForm } from "@/components/attendance/station/station_regular_checkin_form";
import { StationHeader } from "@/components/attendance/station/station_header";
import { HouseholdPicker } from "@/components/attendance/station/station_household_picker";
import { ChurchEvent } from "@/entities/attendance/events";
import { HouseholdInfo } from "@/entities/attendance/person";
import { eventQuery } from "@/lib/queries/attendance/event";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { AddPersonModalForm } from "@/components/attendance/station/station_addperson";
import { useDisclosure } from "@nextui-org/modal";

interface StationActiveEventProp {
  selectedHousehold?: HouseholdInfo;
  onHouseholdSelected: (household: HouseholdInfo) => void;
  churchEvent: ChurchEvent;
  setSelectedHousehold: (household: HouseholdInfo | undefined) => void;
}
function StationActiveEventPage({
  selectedHousehold,
  onHouseholdSelected,
  churchEvent,
  setSelectedHousehold,
}: Readonly<StationActiveEventProp>) {
  return (
    <div className="flex-row flex w-full justify-center">
      {!selectedHousehold && (
        <div className="flex w-[60%]">
          <HouseholdPicker onHouseholdSelected={onHouseholdSelected} />
        </div>
      )}
      {selectedHousehold && (
        <StationCheckInForm
          event={churchEvent}
          household={selectedHousehold}
          onSuccess={() => {
            setSelectedHousehold(undefined);
            toast.success("Checked in successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Bounce,
            });
          }}
          onFailure={(error) => {
            toast.error(`${error.response.data.error.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Bounce,
            });
          }}
        />
      )}
    </div>
  );
}

function StationClosedEventPage({ event }: Readonly<{ event: ChurchEvent }>) {
  const getMessage = () => {
    if (event.hasEnded()) {
      return `Can't Check in to this event. Event has ended at ${event.endDate
        .toDate()
        .toLocaleTimeString()}`;
    }
    if (event.notStarted()) {
      return `Can't Check in yet. Event has not started yet, and will start at ${event.startDate
        .toDate()
        .toLocaleTimeString()}`;
    }
  };
  return (
    <div className="flex-row flex w-full justify-center">
      <div className="flex flex-col bg-default-50 w-[60%] h-32 gap-4 p-4 justify-center">
        <h1 className="text-xl font-medium text-center">{getMessage()}</h1>
      </div>
    </div>
  );
}

export default function StationEventPage() {
  const searchParams = useSearchParams();
  const [churchEvent, setChurchEvent] = useState<ChurchEvent>();
  const [selectedHousehold, setSelectedHousehold] = useState<
    HouseholdInfo | undefined
  >();

  const { isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const eventId = searchParams.get("event") as string;
    const scheduleId = eventId.split(".")[0];
    eventQuery
      .getEvent(scheduleId, eventId)
      .then(setChurchEvent)
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      });
  }, [searchParams]);

  const onHouseholdSelected = (household: HouseholdInfo) => {
    setSelectedHousehold(household);
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      <section className="flex w-full">
        <StationHeader
          event={churchEvent}
          type="check-in"
          onStartOver={() => setSelectedHousehold(undefined)}
          onAddPerson={onOpenChange}
        />
      </section>
      <section className="flex flex-col w-full h-full py-16">
        <AddPersonModalForm isOpen={isOpen} onOpenChange={onOpenChange} />
        <div className="flex-row flex w-full justify-center">
          {churchEvent && churchEvent.isActive() && (
            <StationActiveEventPage
              {...{
                selectedHousehold,
                onHouseholdSelected,
                setSelectedHousehold,
                churchEvent,
              }}
            />
          )}

          {churchEvent && !churchEvent.isActive() && (
            <StationClosedEventPage event={churchEvent} />
          )}
        </div>
      </section>
    </div>
  );
}
