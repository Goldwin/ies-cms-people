import { PersonInfo } from "@/entities/attendance/person";
import { Person } from "@/entities/people/person";
import peopleService from "@/services/people";

interface HouseholdRequest {
  id?: string;
  name: string;
  headId?: string;
  memberIds?: string[];
  isNewHousehold: boolean;
}

interface PersonRequest {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  birthday: string;
  anniversary: string;
  gender: string;
  maritalStatus: string;
}

interface AddPersonRequest {
  household: HouseholdRequest;
  person: PersonRequest;
}

interface PersonCommands {
  addPerson(request: AddPersonRequest): Promise<PersonInfo>;
}

class APIPersonCommands implements PersonCommands {
  async addPerson(request: AddPersonRequest): Promise<PersonInfo> {
    const person = new Person();
    person.firstName = request.person.firstName;
    person.lastName = request.person.lastName;
    person.middleName = request.person.middleName;
    person.emailAddress = request.person.emailAddress;
    person.phoneNumber = request.person.phoneNumber;
    person.address = request.person.address;
    person.birthday = request.person.birthday;
    person.anniversary = request.person.anniversary;
    person.gender = request.person.gender;
    person.maritalStatus = request.person.maritalStatus;

    return peopleService.addPerson(person).then((result) => {
      if (request.household.isNewHousehold) {
        return peopleService
          .createHousehold({
            name: request.household.name,
            headPersonId: result.id,
            memberPersonIds: [],
          })
          .then((household) => {
            return new PersonInfo({
              id: result.id,
              firstName: result.firstName,
              lastName: result.lastName,
              profilePictureUrl: result.profilePictureUrl,
              age: 0,
            });
          });
      }
      if (
        !request.household.id ||
        !request.household.memberIds ||
        !request.household.headId
      ) {
        throw new Error("Invalid Household Request");
      }
      return peopleService
        .updateHousehold({
          id: request.household.id!!,
          name: request.household.name,
          headPersonId: request.household.headId!!,
          memberPersonIds: [...request.household.memberIds, result.id],
        })
        .then((household) => {
          return new PersonInfo({
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            profilePictureUrl: result.profilePictureUrl,
            age: 0,
          });
        });
    });
  }
}

export const personCommands: PersonCommands = new APIPersonCommands();