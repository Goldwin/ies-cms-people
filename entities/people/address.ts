export class Address {
    line1      : string;
	line2      : string;
	city       : string;
	province   : string; 
	postalCode : string;

    constructor(json: any) {
        this.line1 = json.line1
        this.line2 = json.line2
        this.city = json.city
        this.province = json.province
        this.postalCode = json.postal_code        
    }

    toString() {
        return this.line1 + ", " + this.line2 + ", " + this.city + ", " + this.province + ", " + this.postalCode
    }
}