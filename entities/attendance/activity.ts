import { AttendanceType } from "./attendance";

export class Activity {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _scheduleId: string;
  private readonly _timeHour: number;
  private readonly _timeMinute: number;
  private readonly _timezoneOffset: number;
  private readonly _labels: ActivityLabel[];

  constructor({
    id,
    name,
    scheduleId,
    labels,
    timeHour,
    timeMinute,
    timezoneOffset,
  }: {
    id: string;
    name: string;
    scheduleId: string;
    labels: ActivityLabel[];
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
    this._labels = labels;
  }

  public get labels(): ActivityLabel[] {
    return this._labels;
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
  name: string;
  time: Date;

  constructor({ id, name, time }: { id: string; name: string; time: Date }) {
    this.id = id;
    this.name = name;
    this.time = time;
  }
}

export class ActivityLabel {
  private readonly _labelId: string;
  private readonly _labelName: string;
  private readonly _type: string;
  private readonly _attendanceTypes: AttendanceType[];
  private readonly _quantity: number;

  get labelId(): string {
    return this._labelId;
  }

  get labelName(): string {
    return this._labelName;
  }

  get type(): string {
    return this._type;
  }

  get attendanceTypes(): AttendanceType[] {
    return this._attendanceTypes;
  }

  get quantity(): number {
    return this._quantity;
  }

  constructor({
    labelId,
    labelName,
    type,
    attendanceTypes,
    quantity,
  }: {
    labelId: string;
    labelName: string;
    type: string;
    attendanceTypes: string[];
    quantity: number;
  }) {
    this._labelId = labelId;
    this._labelName = labelName;
    this._type = type;
    this._attendanceTypes = attendanceTypes.map(
      (type) => type as AttendanceType
    );
    this._quantity = quantity;
  }
}
