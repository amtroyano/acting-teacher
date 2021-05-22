export class PositionItem {

    positionId: string;
    desc: string;
    corp: number;

    constructor(positionId: string, desc: string, corp?: number) {
        this.positionId = positionId;
        this.desc = desc;
        this.corp = corp;
    }
}