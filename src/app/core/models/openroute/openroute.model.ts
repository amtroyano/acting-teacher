import { Base } from '../base.model';
import { Feature } from './feature.model';

export class OpenRoute extends Base {
    type: string;
    bbox: string;
    features: Array<Feature>;
    geocoding: string;
    metadata: string;
}
