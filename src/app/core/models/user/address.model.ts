import { Base } from '../base.model';

export class Address extends Base {
    region: string;
    city: string;
    town: string;
    postalCode: string;
    address: string;
    latitude: number;
    longitude: number;

    constructor(region: string, city: string, town: string, postalCode: string, address: string) {
        super();
        this.region = region;
        this.city = city;
        this.town = town;
        this.postalCode = postalCode;
        this.address = address;
    }
}
