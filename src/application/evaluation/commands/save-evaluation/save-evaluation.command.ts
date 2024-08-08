export class SaveEvaluationCommand {
    score: number;
    personId: number;
    skillsToImprove: string;
    skillsReached: string;
    constructor(
        score: number,
        personId: number,
        skillsToImprove: string,
        skillsReached: string,
    ) {
        this.score = score
        this.personId = personId
        this.skillsToImprove = skillsToImprove
        this.skillsReached = skillsReached
    }
}