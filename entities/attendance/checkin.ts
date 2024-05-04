export class EventCheckin {
  id: string;

  personId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  profilePictureUrl: string;

  securityCode: string;
  securityNumber: number;
  checkinTime: Date;
  activity: EventActivity;

  constructor({
    id,
    securityCode,
    securityNumber,
    checkinTime,
    activity,
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
    activity: EventActivity;
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
    this.activity = activity;
    this.personId = personId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.profilePictureUrl = profilePictureUrl;
  }
}
