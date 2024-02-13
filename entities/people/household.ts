import { Person } from "./person";

export class Household {
    id: string;
    name: string;
    pictureUrl: string;
    householdHead: Person;
    members: Person[];
    
    constructor();
    constructor(jsonString: string);
    constructor(jsonString?: string) {
        if(!jsonString) {
            jsonString = "{}"
        }
        const json = JSON.parse(jsonString)
        this.id = json.id
        this.name = json.name
        this.pictureUrl = json.picture_url
        this.householdHead = new Person(JSON.stringify(json.household_head))        
        this.members = json.members.map((member: any) => new Person(JSON.stringify(member)))
    }
}