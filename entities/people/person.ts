import { Address } from "./address";

export class Person {
    id: string;
	firstName: string;
    middleName: string;
    lastName: string;
    profilePictureUrl: string;
    addresses: Address[];
    phoneNumbers: string[];
    emailAddress: string[];
    maritalStatus: string;
    birthday: string;
    gender: string;

    constructor(jsonString: string) {
        const json = JSON.parse(jsonString)

        this.id = json.id
        this.firstName = json.first_name
        this.middleName = json.middle_name
        this.lastName = json.last_name
        this.profilePictureUrl = json.profile_picture_url        
        this.phoneNumbers = json.phone_numbers
        this.emailAddress = json.email_address
        this.maritalStatus = json.marital_status
        this.birthday = json.birthday
        this.addresses = []      
        this.gender = json.gender  

        for(let i = 0; i < json.addresses.length; i++) {
            this.addresses.push(new Address(json.addresses[i]))
        }
    }
}