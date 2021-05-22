export class Message {
    code: number;
    text: string;
    error: string;
    title: string;

    constructor(text: string, title?: string, code?: number, error?: string) {
        this.text = text;
        this.title = title || '';
        this.code = code || 0;
        this.error = error || '';
    }
}