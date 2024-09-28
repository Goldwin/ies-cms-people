import { HouseholdInfo, PersonInfo } from "@/entities/attendance/person";
import { attendanceService } from "@/services/attendance";
import peopleService from "@/services/people";

export interface HouseholdFilter {
  name: string;
  limit: number;
}

export interface HouseholdQuery {
  listHouseholds(filter: HouseholdFilter): Promise<HouseholdInfo[]>;
}

interface HouseholdDTO {
  id: string;
  name: string;
  pictureUrl: string;
  householdHead: PersonDTO;
  members: PersonDTO[];
}

interface PersonDTO {
  id: string;
  personId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  age: number;
}

function toPersonInfo(person: PersonDTO): PersonInfo {
  return new PersonInfo({
    id: person.id,
    firstName: person.firstName,
    lastName: person.lastName,
    profilePictureUrl: person.profilePictureUrl,
    age: person.age,
  });
}

function toHouseholdInfo(household: HouseholdDTO): HouseholdInfo {
  return new HouseholdInfo({
    id: household.id,
    name: household.name,
    pictureUrl: household.pictureUrl,
    householdHead: toPersonInfo(household.householdHead),
    members: household.members.map((member) => toPersonInfo(member)),
  });
}

class APIHouseholdQuery implements HouseholdQuery {
  async listHouseholds(filter: HouseholdFilter): Promise<HouseholdInfo[]> {
    return peopleService
      .searchHousehold({
        name: filter.name,
        limit: filter.limit,
      })
      .then((households) => {
        return households.map((h) => toHouseholdInfo(h));
      });
  }
}

export const householdQuery: HouseholdQuery = new APIHouseholdQuery();
