import AbstractObject from "./abstract"


export interface ICustomer {
    email: string,
    forename: string,
    surname: string,
    contactNumber: string,
    postcode: string
}

export class Customer extends AbstractObject {

    constructor(){
        super("customer");
    }
}