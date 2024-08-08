import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SaveEvaluationCommand } from "./save-evaluation.command";
import { IEvaluationRepository } from "src/domain/evaluations/evaluation.repository";
import { Evaluation } from "src/domain/evaluations/evaluation";
import { Person } from "src/domain/work-items/person";

@CommandHandler(SaveEvaluationCommand)
export class SaveEvaluationHandler implements ICommandHandler<SaveEvaluationCommand, boolean> {

    constructor(
        private _evaluationRepository: IEvaluationRepository
    ) { }
    async execute(command: SaveEvaluationCommand): Promise<boolean> {
        let currentDate = new Date();
        let evaluationFound = await this._evaluationRepository.GetOneByDateAndPerson(currentDate, command.personId);
        if (evaluationFound?.isClosed === true) {
            throw Error("La evaluación ya esta cerrada")
        }
        !evaluationFound ? this.insertEvaluation(command, currentDate) : this.updateEvaluation(command, currentDate, evaluationFound.id)
        return true;
    }
    async updateEvaluation(command: SaveEvaluationCommand, currentDate: Date, id: number) {
        let evaluation = new Evaluation(
            id,
            currentDate,
            command.score,
            { id: command.personId } as Person,
            command.skillsToImprove,
            command.skillsReached,
            false
        )
        await this._evaluationRepository.Update(evaluation);

    }
    async insertEvaluation(command: SaveEvaluationCommand, currentDate: Date) {
        let evaluation = new Evaluation(
            null,
            currentDate,
            command.score,
            { id: command.personId } as Person,
            command.skillsToImprove,
            command.skillsReached,
            false
        )
        evaluation.id = await this._evaluationRepository.Insert(evaluation)
    }

}