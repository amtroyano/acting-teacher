export class Column {
    key: string;
    value: string;

    constructor(json: Column) {
        this.key = json.key;
        this.value = json.value;
    }
}
