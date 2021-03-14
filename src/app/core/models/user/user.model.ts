import { Base } from '../base.model';
import { Address } from './address.model';
import { Corp } from './corp.model';
import { Phone } from './phone.model';
import { Position } from './position.model';

export class User extends Base {
    userId: number;
    name: string;
    firstName: string;
    lastName: string;
    cardId: number;
    email: string;
    phones: Array<Phone>;
    addresses: Array<Address>;
    corps: Array<Corp>;

    constructor(json: object) {
        super();
        this.name = json['c1_003'];
        this.firstName = json['c1_002'];
        this.lastName = json['c1_001'];
        this.cardId = json['c1_004'];
        this.email = json['c1_009'];
        this.addresses = new Array<Address>();
        this.addresses.push(new Address(json['c1_010'], json['c1_012'], json['c1_011'], json['c1_013'], json['c1_014']));
        this.phones = new Array<Phone>();
        this.phones.push(new Phone(json['c1_007']));
        this.phones.push(new Phone(json['c1_008']));
        console.info('TODO: Id al perfil para añadir cuerpo de profesorado y especialidades');
        let positions = new Array<Position>();
        positions.push(new Position('11597038', 'Educación Primaria - Bilingüe Inglés'));
        positions.push(new Position('00597060', 'Educación Primaria'));
        positions.push(new Position('CV597038', 'Educación Primaria - Apoyo Covid'));
        this.corps = new Array<Corp>();
        this.corps.push(new Corp(597, 'Cuerpo de maestros', positions));
    }
}
