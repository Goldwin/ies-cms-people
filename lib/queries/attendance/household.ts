import { HouseholdInfo, PersonInfo } from "@/entities/attendance/person";
import { attendanceService } from "@/services/attendance";

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
        id: "1111",
        name: "Doe",
        pictureUrl: "",
        householdHead: new PersonInfo({
          id: "111",
          firstName: "John",
          lastName: "Doe",
          profilePictureUrl: "",
          age: 30,
        }),
        members: [
          new PersonInfo({
            id: "222",
            firstName: "Jane",
            lastName: "Doe",
            profilePictureUrl: "",
            age: 25,
          }),
          new PersonInfo({
            id: "333",
            firstName: "Jack",
            lastName: "Doe",
            profilePictureUrl: "",
            age: 25,
          }),
        ],
      }),
      new HouseholdInfo({
        id: "2222",
        name: "Smith",
        pictureUrl: "",
        householdHead: new PersonInfo({
          id: "444",
          firstName: "John",
          lastName: "Smith",
          profilePictureUrl: "",
          age: 30,
        }),
        members: [
          new PersonInfo({
            id: "555",
            firstName: "Jane",
            lastName: "Smith",
            profilePictureUrl: "",
            age: 25,
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

class APIHouseholdQuery implements HouseholdQuery {
  listHouseholds(filter: HouseholdFilter): Promise<HouseholdInfo[]> {
    return attendanceService.searchHousehold({
      name: filter.name,
      limit: filter.limit,});
  }
}

export const householdQuery: HouseholdQuery = new APIHouseholdQuery();
