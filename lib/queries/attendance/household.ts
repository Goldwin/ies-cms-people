import { HouseholdInfo, PersonInfo } from "@/entities/attendance/person";

export interface HouseholdFilter {
  name: string;
  limit: number;
}

export interface HouseholdQuery {
  listHouseholds(filter: HouseholdFilter): Promise<HouseholdInfo[]>;
}

class MockHouseholdQuery implements HouseholdQuery {
  private readonly _householdList: HouseholdInfo[];

  constructor() {
    this._householdList = [
      new HouseholdInfo({
        id: "1",
        name: "Doe",
        pictureUrl: "",
        householdHead: new PersonInfo({
          id: "1",
          firstName: "John",
          lastName: "Doe",
          profilePictureUrl: "",
        }),
        members: [
          new PersonInfo({
            id: "2",
            firstName: "Jane",
            lastName: "Doe",
            profilePictureUrl: "",
          }),
          new PersonInfo({
            id: "3",
            firstName: "Jack",
            lastName: "Doe",
            profilePictureUrl: "",
          }),
        ],
      }),
      new HouseholdInfo({
        id: "2",
        name: "Smith",
        pictureUrl: "",
        householdHead: new PersonInfo({
          id: "4",
          firstName: "John",
          lastName: "Smith",
          profilePictureUrl: "",
        }),
        members: [
          new PersonInfo({
            id: "5",
            firstName: "Jane",
            lastName: "Smith",
            profilePictureUrl: "",
          }),
        ],
      }),
    ];
  }
  listHouseholds(filter: HouseholdFilter): Promise<HouseholdInfo[]> {
    return Promise.resolve(
      this._householdList.filter((h) => h.name.includes(filter.name))
    );
  }
}

export const householdQuery: HouseholdQuery = new MockHouseholdQuery();
