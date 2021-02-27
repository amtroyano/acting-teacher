import { Base } from '../base.model';
import { Position } from './position.model';

export class Corp extends Base {
    corpId: number;
    desc: string;
    positions: Array<Position>;
}
