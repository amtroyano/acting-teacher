import { Base } from '../base.model';

export class JobOpening extends Base {
    positionId: string;
    desc: string;

    constructor(puesto: string) {
        super();
        let split = puesto.split('-');
        this.positionId = split[0].trim();
        this.desc = split[1].trim() + (split[2] ? ' - ' + split[2].trim() : '');
    }
}
