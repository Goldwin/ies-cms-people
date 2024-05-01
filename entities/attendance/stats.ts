import { AttendanceType } from "./attendance";

export class EventScheduleSummary {
  private _id: string;
  private _name: string;

  private _eventSummaries: EventSummary[];

  constructor({
    id,
    eventSummaries,
    name,
  }: {
    id: string;
    eventSummaries: EventSummary[];
    name: string;
  }) {
    this._id = id;
    this._eventSummaries = eventSummaries;
    this._name = name;
  }

  public get attendanceSeries(): { name: string; data: number[] }[] {
    let series: { [name: string]: number[] } = {};
    this.eventSummaries.forEach((eventSummary) => {
      eventSummary.attendanceCount.forEach((attendanceCount) => {
        if (!series[attendanceCount.attendanceType]) {
          series[attendanceCount.attendanceType] = [];
        }
        series[attendanceCount.attendanceType].push(attendanceCount.count);
      });
    });
    return Object.entries(series).map(([key, value]) => ({
      name: key,
      data: value,
    }));
  }

  public get dateLabels(): string[] {
    return this.eventSummaries.map((eventSummary) => eventSummary.date);
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get eventSummaries(): EventSummary[] {
    return this._eventSummaries;
  }
  public get id(): string {
    return this._id;
  }
}

export class EventSummary {
  private _id: string;
  private _date: string;
  private _attendanceCount: EventAttendanceCountSummary[];

  constructor({
    id,
    date,
    attendanceCount,
  }: {
    id: string;
    date: string;
    attendanceCount: EventAttendanceCountSummary[];
  }) {
    this._id = id;
    this._date = date;
    this._attendanceCount = attendanceCount;
  }

  public get attendanceCount(): EventAttendanceCountSummary[] {
    return this._attendanceCount;
  }

  public get date(): string {
    return this._date;
  }

  public get id(): string {
    return this._id;
  }
}

export class EventAttendanceCountSummary {
  private _attendanceType: AttendanceType;
  private _count: number;

  constructor({
    attendanceType,
    count,
  }: {
    attendanceType: AttendanceType;
    count: number;
  }) {
    this._attendanceType = attendanceType;
    this._count = count;
  }

  public get attendanceType(): AttendanceType {
    return this._attendanceType;
  }

  public get count(): number {
    return this._count;
  }
}
