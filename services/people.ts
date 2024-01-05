import { getToken } from "@/commands/auth/login";
import { Person } from "@/entities/people/person";
import axios from "axios";

const API_URL = process.env.PEOPLE_URL || "";

class PeopleService {
    search(searchQuery: { limit: number; lastID: string}, output: Output<Person[]>) {        
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
}

const peopleService = new PeopleService();
export default peopleService