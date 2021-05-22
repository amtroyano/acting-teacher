import { Base } from '../base.model';
import { Step } from './step.model';

export class Segment extends Base {
    distance: number;
    duration: number;
    steps: Array<Step>;
}
