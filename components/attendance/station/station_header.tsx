"use client";
import { ChurchEvent } from "@/entities/attendance/events";
import { Skeleton, Button } from "@nextui-org/react";

export interface StationHeaderProp {
  event?: ChurchEvent;
  type: "check-in" | "check-out";
  onStartOver?: () => void;
}

export function StationHeader(props: Readonly<StationHeaderProp>) {
  return (
    <div className="flex flex-row mx-0 px-0 w-full bg-default-100">
      <div className="min-h-32 h-32 px-8 py-4 w-full">
        <Skeleton isLoaded={!!props.event}>
          <div className="flex flex-row gap-4 align-middle">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl capitalize">{`${props.event?.name} event ${props.type}`}</h1>
              <h3>
                {props.event?.date.toDate().toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
            </div>
          </div>
        </Skeleton>
      </div>
      <div className="flex flex-row gap-4 justify-end w-full">
        <div className="flex flex-col justify-end my-4 mx-4">
          {props.event && (
            <Button onPress={props.onStartOver}>Start Over</Button>
          )}
        </div>
      </div>
    </div>
    // <div>
    //   <h1 className="text-3xl font-bold">{prop.event.name}</h1>
    //   <h3> {prop.event.date.toLocaleString()}</h3>
    // </div>
  );
}