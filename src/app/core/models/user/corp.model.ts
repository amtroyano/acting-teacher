import { MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY } from '@angular/material-moment-adapter';
import { Base } from '../base.model';
import { Position } from './position.model';

export class Corp extends Base {
    corpId: number;
    desc: string;
    positions: Array<Position>;

    constructor(corpId: number, desc: string, positions?: Array<Position>) {
        super();
        this.corpId = corpId;
        this.desc = desc;
        this.positions = new Array<Position>();
        if (positions) {
            this.positions = positions;
        }
        
    }
}
