import AbstractObject from "./abstract"


export interface IProduct {
    vin: string,
    colour: string,
    make: string,
    model: string,
    price: number
}

export class Product extends AbstractObject {
    constructor(){
        super("product");
    }
}