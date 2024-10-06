export class PersonInfo {
  private readonly _id: string;
  public get id(): string {
    return this._id;
  }
  private readonly _firstName: string;
  public get firstName(): string {
    return this._firstName;
  }
  private readonly _middleName: string | undefined;
  public get middleName(): string | undefined {
    return this._middleName;
  }
  private readonly _lastName: string;
  public get lastName(): string {
    return this._lastName;
  }
  private readonly _profilePictureUrl: string | undefined;
  public get profilePictureUrl(): string | undefined {
    return this._profilePictureUrl;
  }

  public get age(): number {
    return new Date().getFullYear() - this._birthday.getFullYear();
  }

  private readonly _birthday: Date;
  public get birthday(): Date {
    return this._birthday;
  }

  constructor({
    id,
    firstName,
    middleName,
    lastName,
    profilePictureUrl,
    birthday,
  }: {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    profilePictureUrl?: string;
    birthday: string;
  }) {
    this._id = id;
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
    this._profilePictureUrl = profilePictureUrl;

    this._birthday = new Date(birthday);
  }

  public get fullName(): string {
    return `${this._firstName} ${this._middleName ?? ""} ${this._lastName}`;
  }

  public get isAdult(): boolean {
    console.log(this._id, this.age);
    return this.age >= 18;
  }

  public relativeAge(date: Date): number {
    return date.getFullYear() - this._birthday.getFullYear();
  }

  public isRelativelyAdult(date: Date): boolean {
    return this.relativeAge(date) >= 18;
  }
}

export class HouseholdInfo {
  private readonly _id: string;
  public get id(): string {
    return this._id;
  }
  private readonly _name: string;
  public get name(): string {
    return this._name;
  }
  private readonly _pictureUrl: string;
  public get pictureUrl(): string {
    return this._pictureUrl;
  }
  private readonly _householdHead: PersonInfo;
  public get householdHead(): PersonInfo {
    return this._householdHead;
  }
  private readonly _members: PersonInfo[];
  public get members(): PersonInfo[] {
    return this._members;
  }

  constructor({
    id,
    name,
    pictureUrl,
    householdHead,
    members,
  }: {
    id: string;
    name: string;
    pictureUrl: string;
    householdHead: PersonInfo;
    members: PersonInfo[];
  }) {
    this._id = id;
    this._name = name;
    this._pictureUrl = pictureUrl;
    this._householdHead = householdHead;
    this._members = members;
  }
}
