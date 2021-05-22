import { Base } from '../base.model';

export class State extends Base {
    stateId: number;
    desc: string;
    checked: boolean;

    constructor(stateId: number, desc: string) {
        super();
        this.stateId = stateId;
        this.desc = desc;
        this.checked = true;
    }
}