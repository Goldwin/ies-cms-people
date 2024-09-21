import { PersonInfo } from "../attendance/person";
import { EventActivity } from "./activity";

export enum AttendanceType {
  Volunteer = "Volunteer",
  Guest = "Guest",
  Regular = "Regular",
}

export class ChurchActivityAttendance {
  id: string;
  activity: EventActivity;

  person: PersonInfo;
  checkedInBy: PersonInfo;

  securityCode: string;
  securityNumber: number;
  checkinTime: Date;

  attendanceType: AttendanceType;
  firstTime: boolean;

  constructor({
    id,
    activity,
    securityCode,
    securityNumber,
    checkinTime,
    attendee,
    checkedInBy,
    attendanceType = AttendanceType.Regular,
    firstTime = false,
  }: {
    id: string;
    activity: EventActivity;
    securityCode: string;
    securityNumber: number;
    checkinTime: Date;
    attendee: PersonInfo;
    checkedInBy: PersonInfo;
    attendanceType: AttendanceType;
    firstTime: boolean;
  }) {
    this.id = id;
    this.securityCode = securityCode;
    this.securityNumber = securityNumber;
    this.checkinTime = checkinTime;
    this.person = attendee;
    this.checkedInBy = checkedInBy;
    this.activity = activity;
    this.attendanceType = attendanceType;
    this.firstTime = firstTime;
  }

  getFullName(): string {
    return this.person.fullName;
  }

  getCheckInTime(): string {
    return `${this.checkinTime.toLocaleTimeString()}`;
  }
}
