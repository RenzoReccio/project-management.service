import { Person } from "../work-items/person";

export class Evaluation {
    id: number;
    date: Date;
    createdDate: Date;
    updatedDate: Date;
    score: number;
    person: Person;
    skillsToImprove: string;
    skillsReached: string;
    isClosed: boolean;
    constructor(
        id: number,
        date: Date,
        score: number,
        person: Person,
        skillsToImprove: string,
        skillsReached: string,
        isClosed: boolean
    ) {
        this.id = id
        this.date = date
        this.score = score
        this.person = person
        this.skillsToImprove = skillsToImprove
        this.skillsReached = skillsReached
        this.isClosed = isClosed
    }
}