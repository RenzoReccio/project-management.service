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
    quantityScore: number;
    finalScore: number;
    constructor(
        id: number,
        date: Date,
        score: number,
        person: Person,
        skillsToImprove: string,
        skillsReached: string,
        isClosed: boolean,
        quantityScore: number,
    ) {
        this.id = id
        this.date = date
        this.score = score
        this.person = person
        this.skillsToImprove = skillsToImprove
        this.skillsReached = skillsReached
        this.isClosed = isClosed
        this.quantityScore = quantityScore
        this.finalScore = ((this.quantityScore + this.score) / 2)
    }
}