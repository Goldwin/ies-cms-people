export class PersonInfo {
  private readonly _id: string;
  public get id(): string {
    return this._id;
  }
  private readonly _firstName: string;
  public get firstName(): string {
    return this._firstName;
  }
  private readonly _middleName?: string | undefined;
  public get middleName(): string | undefined {
    return this._middleName;
  }
  private readonly _lastName: string;
  public get lastName(): string {
    return this._lastName;
  }
  private readonly _profilePictureUrl?: string | undefined;
  public get profilePictureUrl(): string | undefined {
    return this._profilePictureUrl;
  }

  constructor({
    id,
    firstName,
    middleName,
    lastName,
    profilePictureUrl,
  }: {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    profilePictureUrl?: string;
  }) {
    this._id = id;
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
    this._profilePictureUrl = profilePictureUrl;
  }

  public get fullName(): string {
    return `${this._firstName} ${this._middleName ?? ""} ${this._lastName}`;
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
