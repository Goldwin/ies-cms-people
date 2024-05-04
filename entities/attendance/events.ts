import { ZonedDateTime } from "@internationalized/date";

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
  date: ZonedDateTime;

  constructor({
    id,
    eventScheduleId,
    date,
  }: {
    id: string;
    eventScheduleId: string;
    date: ZonedDateTime;
  }) {
    this.id = id;
    this.eventScheduleId = eventScheduleId;
    this.date = date;
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

export class ChurchEventSessionCheckIn {
  id: string;

  personId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  profilePictureUrl: string;

  securityCode: string;
  securityNumber: number;
  checkinTime: Date;
  checkinLocation: ChurchEventLocation;

  constructor({
    id,
    securityCode,
    securityNumber,
    checkinTime,
    checkinLocation,
    personId,
    firstName,
    middleName,
    lastName,
    profilePictureUrl,
  }: {
    id: string;
    securityCode: string;
    securityNumber: number;
    checkinTime: Date;
    checkinLocation: ChurchEventLocation;
    personId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    profilePictureUrl: string;
  }) {
    this.id = id;
    this.securityCode = securityCode;
    this.securityNumber = securityNumber;
    this.checkinTime = checkinTime;
    this.checkinLocation = checkinLocation;
    this.personId = personId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.profilePictureUrl = profilePictureUrl;
  }

  getFullName(): string {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }

  getCheckInTime(): string {
    return `${this.checkinTime.toLocaleTimeString()}`;
  }
}

export class ChurchEventSession {
  eventId: string;
  sessionNumber: number;
  date: Date;

  constructor({
    eventId,
    date,
    sessionNumber,
  }: {
    eventId: string;
    date: Date;
    sessionNumber: number;
  }) {
    this.eventId = eventId;
    this.date = date;
    this.sessionNumber = sessionNumber;
  }
}

export class ChurchEventSessionStats {
  id: string;
  date: string;
  attendanceCount: number;

  constructor({
    id,
    date,
    attendanceCount,
  }: {
    id: string;
    date: string;
    attendanceCount: number;
  }) {
    this.id = id;
    this.date = date;
    this.attendanceCount = attendanceCount;
  }
}

export class ChurchEventStats {
  id: string;
  name: string;
  sessions: ChurchEventSessionStats[];

  constructor({
    id,
    name,
    sessions,
  }: {
    id: string;
    name: string;
    sessions: ChurchEventSessionStats[];
  }) {
    this.id = id;
    this.name = name;
    this.sessions = sessions;
  }

  get dateLabels(): string[] {
    return this.sessions.map((session) => session.date);
  }

  get attendanceCount(): number[] {
    return this.sessions.map((session) => session.attendanceCount);
  }

  get totalAttendanceCount(): number {
    return this.sessions.reduce(
      (total, session) => total + session.attendanceCount,
      0
    );
  }
}

export enum EventType {
  WEEKLY = "Weekly",
  ONE_TIME = "One Time",
}
