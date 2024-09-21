export class ActivityAttendanceSummary {
  private readonly _total: number;
  private readonly _name: string;
  private readonly _totalByType: Record<string, number>;

  constructor({
    total,
    name,
    totalByType,
  }: {
    total: number;
    name: string;
    totalByType: Record<string, number>;
  }) {
    this._total = total;
    this._name = name;
    this._totalByType = totalByType;
  }

  get total(): number {
    return this._total;
  }

  get name(): string {
    return this._name;
  }

  get totalByType(): Record<string, number> {
    return this._totalByType;
  }
}

export class EventAttendanceSummary {
  private readonly _totalCheckedIn: number;
  private readonly _totalCheckedOut: number;
  private readonly _totalFirstTimer: number;
  private readonly _total: number;
  private readonly _totalByType: Record<string, number>;
  private readonly _activitiesSummary: ActivityAttendanceSummary[];
  private readonly _date: Date;
  private readonly _id: string;
  constructor({
    totalCheckedIn,
    totalCheckedOut,
    totalFirstTimer,
    total,
    totalByType,
    activitiesSummary,
    date,
    id,
  }: {
    totalCheckedIn: number;
    totalCheckedOut: number;
    totalFirstTimer: number;
    total: number;
    totalByType: Record<string, number>;
    activitiesSummary: ActivityAttendanceSummary[];
    date: Date;
    id: string;
  }) {
    this._totalCheckedIn = totalCheckedIn;
    this._totalCheckedOut = totalCheckedOut;
    this._totalFirstTimer = totalFirstTimer;
    this._total = total;
    this._totalByType = totalByType;
    this._activitiesSummary = activitiesSummary;
    this._date = date;
    this._id = id;
  }

  get totalCheckedIn(): number {
    return this._totalCheckedIn;
  }

  get totalCheckedOut(): number {
    return this._totalCheckedOut;
  }

  get totalFirstTimer(): number {
    return this._totalFirstTimer;
  }

  get total(): number {
    return this._total;
  }

  get totalByType(): Record<string, number> {
    return this._totalByType;
  }

  get activitiesSummary(): ActivityAttendanceSummary[] {
    return this._activitiesSummary;
  }

  get date(): Date {
    return this._date;
  }

  get id(): string {
    return this._id;
  }
}
