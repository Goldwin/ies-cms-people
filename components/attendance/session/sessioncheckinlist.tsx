import {
  ChurchEvent,
  ChurchEventSession,
  ChurchEventSessionCheckIn,
} from "@/entities/attendance/events";
import { attendanceQuery } from "@/lib/queries/attendance";
import { Button, Card, CardBody, Chip, User } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const SessionCheckInList = ({
  className,
  churchEventSession,
}: {
  className?: string;
  churchEventSession?: ChurchEventSession;
}) => {
  const [checkInList, setCheckInList] = useState<ChurchEventSessionCheckIn[]>(
    []
  );

  const limit = 10;

  const loadMoreCheckInList = () => {
    const lastCheckInId = checkInList[checkInList.length - 1].id;
    if (churchEventSession) {
      attendanceQuery
        .getChurchEventSessionCheckInList(
          churchEventSession?.eventId,
          churchEventSession?.sessionNumber,
          limit,
          lastCheckInId
        )
        .then((result) => setCheckInList([...checkInList, ...result]));
    }
  };

  useEffect(() => {
    if (churchEventSession) {
      attendanceQuery
        .getChurchEventSessionCheckInList(
          churchEventSession.eventId,
          churchEventSession.sessionNumber,
          limit,
          ""
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
      <div className="flex flex-col gap-4 my-4">
        {checkInList.map((checkIn) => (
          <Card key={checkIn.id} className="flex w-full justify-start">
            <CardBody className="flex flex-row justify-between items-start">
              <User
                name={checkIn.getFullName()}
                description={checkIn.checkinLocation.name}
              />
              <div>
                <Chip>Checked in at {checkIn.getCheckInTime()}</Chip>
              </div>
            </CardBody>
          </Card>
        ))}
        <Button onClick={loadMoreCheckInList}>Load More</Button>
      </div>
    </div>
  );
};
