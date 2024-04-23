import {
  ChurchEvent,
  ChurchEventSession,
  ChurchEventSessionCheckIn,
} from "@/entities/attendance/events";
import { attendanceQuery } from "@/lib/queries/attendance";
import { User } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const SessionCheckIn = ({
  className,
  churchEventSession,
}: {
  className?: string;
  churchEventSession?: ChurchEventSession;
}) => {
  const [checkInList, setCheckInList] = useState<ChurchEventSessionCheckIn[]>(
    []
  );
  useEffect(() => {
    console.log(churchEventSession);
    if (churchEventSession) {
      console.log(churchEventSession);
      attendanceQuery
        .getChurchEventSessionCheckInList(
          churchEventSession.eventId,
          churchEventSession.sessionNumber
        )
        .then((res) => {
          console.log(res);
          return res;
        })
        .then(setCheckInList);
    }
  }, [churchEventSession]);
  return (
    <div className={className}>
      <div className="flex flex-row">
        {checkInList.map((checkIn) => (
          <User key={checkIn.id} name={checkIn.getFullName()} />
        ))}
      </div>
    </div>
  );
};
