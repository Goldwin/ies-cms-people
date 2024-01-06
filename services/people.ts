'use client'
import { getToken } from "@/commands/auth/login";
import { Person } from "@/entities/people/person";
import axios from "axios";
import { camelCase, snakeCase } from 'lodash';

const API_URL = process.env.PEOPLE_URL || "";

const camelizeKeys:any = (obj:any) => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

const snakeCaseKeys:any = (obj:any) => {
    if (Array.isArray(obj)) {
      return obj.map(v => snakeCaseKeys(v));
    } else if (obj != null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [snakeCase(key)]: snakeCaseKeys(obj[key]),
        }),
        {},
      );
    }
    return obj;
};

class PeopleService {
    async search(searchQuery: { limit: number; lastID: string}, output: Output<Person[]>) {        
        const url = API_URL + "/search"
        const token = getToken()
        return axios.post(url, {
            limit: searchQuery.limit,
            last_id: searchQuery.lastID
        }, {headers: {"Authorization": `Bearer ${token}`}}).then(response => {
            let persons:Person[]
            persons = []
            response.data.data.forEach((person: any) => {
                persons.push(new Person(JSON.stringify(person)))
            })
            output.onSuccess(persons)
        }).catch(error => {
            output.onError(error)
        });
    }

    async add(person: Person, output: Output<Person>) {
        const url = API_URL + "/person"
        const token = getToken()
        
        const payload = snakeCaseKeys(person)    

        return axios.post(url, payload, {headers: {"Authorization": `Bearer ${token}`}}).then(response => {
            const result:Person = new Person(JSON.stringify(response.data.data))
            output.onSuccess(result)
        }).catch(error => {
            output.onError(error)
        });
    }
}

const peopleService = new PeopleService();
export default peopleService