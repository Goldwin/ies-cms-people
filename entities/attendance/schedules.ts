import { Activity } from "./activity";

export enum EventScheduleType {
  OneTime = "OneTime",
  Daily = "Daily",
  Weekly = "Weekly",
  None = "None",
}

export class EventSchedule {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _type: EventScheduleType;
  private readonly _activities: Activity[];
  private readonly _timezoneOffset: number;

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): EventScheduleType {
    return this._type;
  }

  public get activities(): Activity[] {
    return this._activities;
  }

  public get timezoneOffset(): number {
    return this._timezoneOffset;
  }

  constructor({
    id,
    name,
    type = EventScheduleType.OneTime,
    activities,
    timezoneOffset = 7,
  }: {
    id: string;
    name: string;
    type: EventScheduleType;
    activities: Activity[];
    timezoneOffset: number;
  }) {
    this._id = id;
    this._name = name;
    this._type = type;
    this._activities = activities;
    this._timezoneOffset = timezoneOffset;
  }
}

export class OneTimeEventSchedule extends EventSchedule {
  private _date: Date;
  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
  }

  constructor({
    id,
    date,
    name,
    activities,
    timezoneOffset = 7,
  }: {
    id: string;
    date: Date;
    name: string;
    activities: Activity[];
    timezoneOffset: number;
  }) {
    super({
      id: id,
      type: EventScheduleType.OneTime,
      name: name,
      activities: activities,
      timezoneOffset: timezoneOffset,
    });
    this._date = date;
  }
}

export class DailyEventSchedule extends EventSchedule {
  private _startDate: Date;
  private _endDate: Date;
  public get startDate(): Date {
    return this._startDate;
  }
  public set startDate(value: Date) {
    this._startDate = value;
  }

  public get endDate(): Date {
    return this._endDate;
  }
  public set endDate(value: Date) {
    this._endDate = value;
  }

  constructor({
    id,
    timezoneOffset,
    startDate,
    endDate,
    name,
    activities,
  }: {
    id: string;
    timezoneOffset: number;
    startDate: Date;
    endDate: Date;
    name: string;
    activities: Activity[];
  }) {
    super({
      id: id,
      type: EventScheduleType.Daily,
      name: name,
      activities: activities,
      timezoneOffset: timezoneOffset,
    });
    this._endDate = endDate;
    this._startDate = startDate;
  }
}

export class WeeklyEventSchedule extends EventSchedule {
  private _days: number[];

  public get days(): number[] {
    return this._days;
  }
  public set days(value: number[]) {
    this._days = value;
  }

  constructor({
    id,
    days = [],
    timezoneOffset,
    name,
    activities,
  }: {
    id: string;
    days: number[];
    timezoneOffset: number;
    name: string;
    activities: Activity[];
  }) {
    super({
      id: id,
      type: EventScheduleType.Weekly,
      name,
      activities: activities,
      timezoneOffset: timezoneOffset,
    });
    this._days = days;
  }
}
