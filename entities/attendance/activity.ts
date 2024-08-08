import { ZonedDateTime } from "@internationalized/date";

export class Activity {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _scheduleId: string;
  private readonly _timeHour: number;
  private readonly _timeMinute: number;
  private readonly _timezoneOffset: number;

  constructor({
    id,
    name,
    scheduleId,
    timeHour,
    timeMinute,
    timezoneOffset,
  }: {
    id: string;
    name: string;
    scheduleId: string;
    timeHour: number;
    timeMinute: number;
    timezoneOffset: number;
  }) {
    this._id = id;
    this._name = name;
    this._scheduleId = scheduleId;
    this._timeHour = timeHour;
    this._timeMinute = timeMinute;
    this._timezoneOffset = timezoneOffset;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get scheduleId(): string {
    return this._scheduleId;
  }

  get hour(): number {
    return this._timeHour;
  }

  get minute(): number {
    return this._timeMinute;
  }

  get timezoneOffset(): number {
    return this._timezoneOffset;
  }

  toGenericObject(): any {
    return {
      id: this.id,
      name: this.name,
      scheduleId: this.scheduleId,
      startTime: `${String(this.hour).padStart(2, "0")}:${String(
        this.minute
      ).padStart(2, "0")}`,
      timezoneOffset: this.timezoneOffset,
    };
  }
}

export class EventActivity {
  id: string;
  activityId: string;
  eventId: string;
  name: string;
  time: ZonedDateTime;

  constructor({
    id,
    name,
    activityId,
    time,
    eventId,
  }: {
    id: string;
    name: string;
    activityId: string;
    time: ZonedDateTime;
    eventId: string;
  }) {
    this.id = id;
    this.activityId = activityId;
    this.name = name;
    this.time = time;
    this.eventId = eventId;
  }
}
