import { Person } from "./person";

export class Comment {
    id: number;
    date: Date;
    user: Person;
    text: string;

    constructor({
        id,
        date,
        user,
        text,
    }: {
        id: number;
        date: Date;
        user: Person;
        text: string;
    }) {
        this.id = id;
        this.date = date;
        this.user = user;
        this.text = text;
    }
}
