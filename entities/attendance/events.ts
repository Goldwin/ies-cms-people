export class ChurchEvent {
  id: string;
  name: string;
  eventType: EventType;

  constructor({
    id,
    name,
    eventType,
  }: {
    id: string;
    name: string;
    eventType: EventType;
  }) {
    this.id = id;
    this.name = name;
    this.eventType = eventType;
  }
}

export class ChurchEventLocation {
    
}


export class ChurchEventSessionCheckIn {
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
