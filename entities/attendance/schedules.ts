export enum EventScheduleType {
  OneTime = "OneTime",
  Daily = "Daily",
  Weekly = "Weekly",
}

export class EventSchedule {
  private _id: string;
  private _name: string;
  private _type: EventScheduleType;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get type(): EventScheduleType {
    return this._type;
  }
  public set type(value: EventScheduleType) {
    this._type = value;
  }

  constructor({
    id,
    name,
    type = EventScheduleType.OneTime,
  }: {
    id: string;
    name: string;
    type?: EventScheduleType;
  }) {
    this._id = id;
    this._name = name;
    this._type = type;
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

  constructor({ id, date, name }: { id: string; date: Date; name: string }) {
    super({ id: id, type: EventScheduleType.OneTime, name: name });
    this._date = date;
  }
}

export class DailyEventSchedule extends EventSchedule {
  private _startDate: Date;
  private _timezoneOffset: number;
  private _endDate: Date;
  private _time: number;
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

  public get time(): number {
    return this._time;
  }
  public set time(value: number) {
    this._time = value;
  }

  public get timezoneOffset(): number {
    return this._timezoneOffset;
  }
  public set timezoneOffset(value: number) {
    this._timezoneOffset = value;
  }
  constructor({
    id,
    time,
    timezoneOffset,
    startDate,
    endDate,
    name,
  }: {
    id: string;
    time: number;
    timezoneOffset: number;
    startDate: Date;
    endDate: Date;
    name: string;
  }) {
    super({ id: id, type: EventScheduleType.Daily, name: name });
    this._time = time;
    this._timezoneOffset = timezoneOffset;
    this._endDate = endDate;
    this._startDate = startDate;
  }
}

export class WeeklyEventSchedule extends EventSchedule {
  private _day: number;
  private _time: number;
  private _timezoneOffset: number;

  public get day(): number {
    return this._day;
  }
  public set day(value: number) {
    this._day = value;
  }

  public get time(): number {
    return this._time;
  }
  public set time(value: number) {
    this._time = value;
  }

  public get timezoneOffset(): number {
    return this._timezoneOffset;
  }
  public set timezoneOffset(value: number) {
    this._timezoneOffset = value;
  }

  constructor({
    id,
    day,
    time,
    timezoneOffset,
    name,
  }: {
    id: string;
    day: number;
    time: number;
    timezoneOffset: number;
    name: string;
  }) {
    super({ id: id, type: EventScheduleType.Weekly, name });
    this._day = day;
    this._time = time;
    this._timezoneOffset = timezoneOffset;
  }
}
