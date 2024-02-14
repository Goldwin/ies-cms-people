"use client";
import { getToken } from "@/lib/commands/auth/login";
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

const snakeCaseKeys: any = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => snakeCaseKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: snakeCaseKeys(obj[key]),
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

class PeopleService {
  async searchPerson(searchQuery: SearchQuery): Promise<Person[]> {
    const url = API_URL + "/search";
    const token = getToken();
    return axios
      .post(
        url,
        {
          limit: searchQuery.limit,
          last_id: searchQuery.lastID,
          name_prefix: searchQuery.namePrefix ?? "",
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

  async add(person: Person, output: Output<Person>) {
    const url = API_URL + "/person";
    const token = getToken();

    const payload = snakeCaseKeys(person);

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

  async get(personId: string, output: Output<Person>) {
    const url = API_URL + "/person/" + personId;
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
    const url = API_URL + "/person/" + personId + "/household";
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

  async createHousehold(
    request: HouseholdCreationRequest
  ): Promise<Household | null | undefined> {
    const url = API_URL + "/household";
    const payload = snakeCaseKeys(request);
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
    const url = API_URL + "/household/" + request.id;
    const payload = snakeCaseKeys(request);
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

  async update(personId: string, person: Person, output: Output<Person>) {
    const url = API_URL + "/person/" + personId;
    const token = getToken();
    const payload = snakeCaseKeys(person);
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
