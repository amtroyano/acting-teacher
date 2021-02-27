import { Base } from '../base.model';
import { Summary } from './summary.model';

export class Property extends Base {
    segments: Array<number>;
    summary: Summary;
}
