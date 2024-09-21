export class Person {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  profilePictureUrl: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  maritalStatus: string;
  birthday: string;
  gender: string;
  anniversary: string;

  constructor();
  constructor(jsonString: string);
  constructor(jsonString?: string) {
    if (!jsonString) {
      jsonString = "{}";
    }
    const json = JSON.parse(jsonString);

    this.id = json.id;
    this.firstName = json.firstName;
    this.middleName = json.middleName;
    this.lastName = json.lastName;
    this.profilePictureUrl = json.profilePictureUrl;
    this.phoneNumber = json.phoneNumber;
    this.emailAddress = json.emailAddress;
    this.maritalStatus = json.maritalStatus;
    this.birthday = json.birthday;
    this.address = json.address;
    this.gender = json.gender;
    this.anniversary = json.anniversary;
  }

  getFullName(): string {
    return (
      this.firstName +
      (this.middleName ? ` ${this.middleName}` : "") +
      " " +
      this.lastName
    );
  }

  getBirthdayString(): string {
    if (!this.birthday) return "";
    const date = new Date(this.birthday);
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
}
