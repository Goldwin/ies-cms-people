export class Person {
    id: string;
	firstName: string;
    middleName: string;
    lastName: string;
    profilePictureUrl: string;
    address: string;
    phoneNumber: string;
    emailAddress: string;
    maritalStatus: string;
    birthday: string;
    gender: string;
    anniversary:string;

    constructor();
    constructor(jsonString:string)
    constructor(jsonString?: string) {
        if(!jsonString) {
            jsonString = "{}"
        }
        const json = JSON.parse(jsonString)

        this.id = json.id
        this.firstName = json.first_name
        this.middleName = json.middle_name
        this.lastName = json.last_name
        this.profilePictureUrl = json.profile_picture_url        
        this.phoneNumber = json.phone_numbers
        this.emailAddress = json.email_address
        this.maritalStatus = json.marital_status
        this.birthday = json.birthday
        this.address = json.address
        this.gender = json.gender  
        this.anniversary = json.anniversary
    }
}