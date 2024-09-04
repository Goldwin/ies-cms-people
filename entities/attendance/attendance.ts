import { EventActivity } from "./activity";
import { ChurchEventLocation } from "./events";
import { PersonInfo } from "./person";

export enum AttendanceType {
  Volunteer = "Volunteer",
  Guest = "Guest",
  Regular = "Regular",
}

export class ChurchActivityAttendance {
  id: string;
  activity: EventActivity;

  person: PersonInfo;

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
    age = 0,
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
    age: number;
  }) {
    this.id = id;
    this.securityCode = securityCode;
    this.securityNumber = securityNumber;
    this.checkinTime = checkinTime;
    this.person = new PersonInfo({
      id: personId,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      profilePictureUrl: profilePictureUrl,
      age: age,
    });
    this.activity = activity;
    this.attendanceType = attendanceType;
  }

  getFullName(): string {
    return this.person.fullName;
  }

  getCheckInTime(): string {
    return `${this.checkinTime.toLocaleTimeString()}`;
  }
}
