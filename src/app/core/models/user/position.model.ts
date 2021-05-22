import { Base } from '../base.model';

export class Position extends Base {
    positionId: string;
    desc: string;
    checked: boolean;

    constructor(positionId: string, desc: string) {
        super();
        this.positionId = positionId;
        this.desc = desc;
        this.checked = true;
    }
}
