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
        //this.city = city;
        console.info('TODO: Buscar el pueblo por el código ');
        this.city = 'Bailén';
        this.town = town;
        this.postalCode = postalCode;
        this.address = address;
    }
}
