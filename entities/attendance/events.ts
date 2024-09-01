import { ZonedDateTime } from "@internationalized/date";
import { EventActivity } from "@/entities/attendance/activity";

export class ChurchEventTimeConfig {
  startTime: number;
  endTime: number;
  timezoneOffset: number;

  constructor({
    startTime,
    endTime,
    timezoneOffset,
  }: {
    startTime: number;
    endTime: number;
    timezoneOffset: number;
  }) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.timezoneOffset = timezoneOffset;
  }
}

export class ChurchEvent {
  id: string;
  eventScheduleId: string;
  activities: EventActivity[];
  date: ZonedDateTime;
  name: string;

  constructor({
    id,
    eventScheduleId,
    date,
    name,
    activities,
  }: {
    id: string;
    eventScheduleId: string;
    date: ZonedDateTime;
    activities: EventActivity[];
    name: string;
  }) {
    this.id = id;
    this.eventScheduleId = eventScheduleId;
    this.date = date;
    this.activities = activities;
    this.name = name;
  }
}

export class ChurchEventLocation {
  id: string;
  name: string;
  day: number;
  time: number;

  constructor({
    id,
    name,
    day = 0,
    time = 0,
  }: {
    id: string;
    name: string;
    day?: number;
    time?: number;
  }) {
    this.id = id;
    this.name = name;
    this.day = day;
    this.time = time;
  }
}

export enum EventType {
  WEEKLY = "Weekly",
  ONE_TIME = "One Time",
}
