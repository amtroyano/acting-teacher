import { Base } from '../base.model';
import { Segment } from './segment.model';
import { Step } from './step.model';
import { Summary } from './summary.model';

export class Property extends Base {
    segments: Array<Segment>;
    summary: Summary;
}
