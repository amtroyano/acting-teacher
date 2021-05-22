import { Base } from '../base.model';

export class Step extends Base {
    distance: number;
    duration: number;
    instruction: string;
    name: string;
    type: number;
}
