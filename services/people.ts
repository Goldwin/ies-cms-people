"use client";
import { getToken } from "@/lib/commands/login";
import { Person } from "@/entities/people/person";
import axios from "axios";
import { camelCase, snakeCase } from "lodash";
import { Household } from "@/entities/people/household";

const API_URL = process.env.PEOPLE_URL ?? "";

const camelizeKeys: any = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {}
    );
  }
  return obj;
};

interface SearchQuery {
  limit: number;
  lastID: string;
  namePrefix?: string;
}

interface HouseholdCreationRequest {
  name: string;
  memberPersonIds: string[];
  headPersonId: string;
}

interface HouseholdUpdateRequest {
  id: string;
  name: string;
  memberPersonIds: string[];
  headPersonId: string;
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

interface PersonDTO {
  id: string;
  personId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  age: number;
}

class PeopleService {
  async searchPerson(searchQuery: SearchQuery): Promise<Person[]> {
    const url = API_URL + "/search";
    const token = getToken();
    return axios
      .post(
        url,
        {
          limit: searchQuery.limit,
          lastId: searchQuery.lastID,
          namePrefix: searchQuery.namePrefix ?? "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        let persons: Person[];
        persons = [];
        response.data.data.forEach((person: any) => {
          persons.push(new Person(JSON.stringify(person)));
        });
        return persons;
      });
  }

  public async searchHousehold({
    name,
    limit = 200,
  }: {
    name: string;
    limit: number;
  }): Promise<HouseholdDTO[]> {
    const url = `${API_URL}/households/search`;
    return axios
      .post(
        url,
        {
          namePrefix: name,
          limit: limit,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        const data: HouseholdDTO[] = response.data.data as HouseholdDTO[];

        return data
      });
  }

  async add(person: Person, output: Output<Person>) {
    const url = API_URL + "/persons";
    const token = getToken();

    const payload = person;

    return axios
      .post(url, payload, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const result: Person = new Person(JSON.stringify(response.data.data));
        output.onSuccess(result);
      })
      .catch((error) => {
        output.onError(error);
      });
  }

  async addPerson(person: Person): Promise<Person> {
    const url = API_URL + "/persons";
    const token = getToken();

    const payload = person;

    return axios
      .post(url, payload, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const result: Person = new Person(JSON.stringify(response.data.data));
        return result;
      });
  }

  async get(personId: string, output: Output<Person>) {
    const url = API_URL + "/persons/" + personId;
    const token = getToken();

    return axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const result: Person = new Person(JSON.stringify(response.data.data));
        output.onSuccess(result);
      })
      .catch((error) => {
        output.onError(error);
      });
  }

  async getHousehold(personId: string): Promise<Household | null | undefined> {
    const url = API_URL + "/persons/" + personId + "/household";
    return axios
      .get(url, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((response) => {
        const result: Household = new Household(
          JSON.stringify(response.data.data)
        );
        return result;
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      });
  }

  async delete(personId: string): Promise<boolean> {
    const url = API_URL + "/persons/" + personId;
    return axios
      .delete(url, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  async createHousehold(
    request: HouseholdCreationRequest
  ): Promise<Household | null | undefined> {
    const url = API_URL + "/household";
    const payload = request;
    return axios
      .post(url, payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        const result: Household = new Household(
          JSON.stringify(response.data.data)
        );
        return result;
      });
  }

  async updateHousehold(request: HouseholdUpdateRequest): Promise<Household> {
    const url = API_URL + "/households/" + request.id;
    const payload = request;
    return axios
      .put(url, payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        const result: Household = new Household(
          JSON.stringify(response.data.data)
        );
        return result;
      });
  }

  async deleteHousehold(householdId: string): Promise<boolean> {
    const url = API_URL + "/households/" + householdId;
    return axios
      .delete(url, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((response) => {
        return true;
      });
  }

  async update(personId: string, person: Person, output: Output<Person>) {
    const url = API_URL + "/persons/" + personId;
    const token = getToken();
    const payload = person;
    return axios
      .put(url, payload, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const result: Person = new Person(JSON.stringify(response.data.data));
        output.onSuccess(result);
      })
      .catch((error) => {
        output.onError(error);
      });
  }
}

const peopleService = new PeopleService();
export default peopleService;
