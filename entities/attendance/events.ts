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
  startDate: ZonedDateTime;
  endDate: ZonedDateTime;
  name: string;

  constructor({
    id,
    eventScheduleId,
    startDate,
    endDate,
    name,
    activities,
  }: {
    id: string;
    eventScheduleId: string;
    startDate: ZonedDateTime;
    endDate: ZonedDateTime;
    activities: EventActivity[];
    name: string;
  }) {
    this.id = id;
    this.eventScheduleId = eventScheduleId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.activities = activities;
    this.name = name;
  }

  hasEnded(): boolean {
    const now = new Date();
    return this.endDate.toDate() < now;
  }

  notStarted(): boolean {
    const now = new Date();
    return now < this.startDate.toDate();
  }

  isActive(): boolean {
    const now = new Date();
    return this.startDate.toDate() <= now && now <= this.endDate.toDate();
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
