import { ChurchEvent } from "@/entities/attendance/events";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

interface EventOverviewProps {
  event?: ChurchEvent;
}

export const EventOverview = ({ event }: EventOverviewProps) => {
  return (
    <div className="flex flex-row w-full gap-4 p-4">
      <div className="w-2/5 flex flex-col gap-4">
        <Card className="flex">
          <CardBody className="flex w-full justify-center bg-default">
            <h1 className="text-5xl text-center font-bold">777</h1>
          </CardBody>
          <CardFooter className="flex w-full justify-center text-center font-medium bg-default-100">
            TOTAL PEOPLE
          </CardFooter>
        </Card>
        <Card className="flex">
          <CardBody className="flex w-full justify-center gap-4">
            <div>
              <h3 className="font-medium">Checked In</h3>
              <div className="text-center font-bold">
                <h1 className="text-5xl text-center font-bold">777</h1>
              </div>
            </div>
            <Divider orientation="horizontal" />
            <div>
              <h3 className="font-medium">Checked Out</h3>
              <h1 className="text-5xl text-center font-bold">777</h1>
            </div>
            <Divider orientation="horizontal" />
            <div>
              <h3 className="font-medium">First Timer</h3>
              <h1 className="text-5xl text-center font-bold">777</h1>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="w-3/5 flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <Card className="w-1/3">
            <CardBody className="flex w-full justify-center bg-blue-500">
              <h1 className="text-5xl text-center font-bold">345</h1>
            </CardBody>
            <CardFooter className="flex w-full justify-center text-center font-medium bg-blue-700">
              REGULAR
            </CardFooter>
          </Card>
          <Card className="w-1/3">
            <CardBody className="flex w-full justify-center bg-purple-500">
              <h1 className="text-5xl text-center font-bold">345</h1>
            </CardBody>
            <CardFooter className="flex w-full justify-center text-center font-medium bg-purple-700">
              GUEST
            </CardFooter>
          </Card>
          <Card className="w-1/3">
            <CardBody className="flex w-full justify-center bg-red-600">
              <h1 className="text-5xl text-center font-bold">345</h1>
            </CardBody>
            <CardFooter className="flex w-full justify-center text-center font-medium bg-red-800">
              VOLUNTEER
            </CardFooter>
          </Card>
        </div>
        <div className="flex">
          <Card className="w-full">
            <CardHeader>Activities</CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-col">
                <div className="flex flex-row gap-4 justify-between">
                  <div className="flex gap-4">
                    <span>123</span>
                    <span>Activity 1</span>
                  </div>
                  <div className="flex flex-row gap-4 justify-between">
                    <span>100</span>
                    <span>11</span>
                    <span>12</span>
                  </div>
                </div>
                <div className="flex flex-row"></div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="flex flex-row"></div>
    </div>
  );
};
