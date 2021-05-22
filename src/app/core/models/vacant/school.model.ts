import { Base } from "../base.model";

export class School extends Base {
    schoolId: string;
    name: string;
    address: string;

    constructor(centro: string) {
        super();
        let split = centro.split('-');
        this.schoolId = split[0].trim();
        this.name = split[1].trim();
    }
}
