import { EventActivity } from "./activity";
import { ChurchEventLocation } from "./events";

export enum AttendanceType {
  Volunteer = "Volunteer",
  Guest = "Guest",
  Regular = "Regular",
}

export class ChurchActivityAttendance {
  id: string;
  activity: EventActivity;

  personId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  profilePictureUrl?: string;

  securityCode: string;
  securityNumber: number;
  checkinTime: Date;

  attendanceType: AttendanceType;

  constructor({
    id,
    activity,
    securityCode,
    securityNumber,
    checkinTime,
    personId,
    firstName,
    middleName,
    lastName,
    profilePictureUrl,
    attendanceType = AttendanceType.Regular,
  }: {
    id: string;
    activity: EventActivity;
    securityCode: string;
    securityNumber: number;
    checkinTime: Date;
    checkinLocation: ChurchEventLocation;
    personId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    profilePictureUrl?: string;
    attendanceType: AttendanceType;
  }) {
    this.id = id;
    this.securityCode = securityCode;
    this.securityNumber = securityNumber;
    this.checkinTime = checkinTime;
    this.personId = personId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.profilePictureUrl = profilePictureUrl;
    this.activity = activity;
    this.attendanceType = attendanceType;
  }

  getFullName(): string {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }

  getCheckInTime(): string {
    return `${this.checkinTime.toLocaleTimeString()}`;
  }
}
