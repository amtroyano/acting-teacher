import { Base } from '../base.model';
import { Geometry } from './geometry.model';
import { Property } from './property.model';

export class Feature extends Base {
    type: string;
    bbox: string;
    geometry: Geometry;
    properties: Property;
}
