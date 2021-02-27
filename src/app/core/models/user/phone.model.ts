import { Base } from '../base.model';
import { Address } from './address.model';
import { Corp } from './corp.model';

export class Phone extends Base {
    phoneNumber: string;

    constructor(phone: string) {
        super();
        this.phoneNumber = phone;
    }
}
