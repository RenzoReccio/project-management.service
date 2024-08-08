import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IEvaluationRepository } from "src/domain/evaluations/evaluation.repository";
import { SaveEvaluationCommand } from "../save-evaluation/save-evaluation.command";
import { CloseEvaluationCommand } from "./close-evaluation.command";

@CommandHandler(CloseEvaluationCommand)
export class CloseEvaluationHandler implements ICommandHandler<CloseEvaluationCommand, boolean> {

    constructor(
        private _evaluationRepository: IEvaluationRepository
    ) { }
    async execute(command: SaveEvaluationCommand): Promise<boolean> {
        let currentDate = new Date();
        let evaluationFound = await this._evaluationRepository.GetOneByDateAndPerson(currentDate, command.personId);
        if (evaluationFound?.isClosed === true) {
            throw Error("La evaluación ya esta cerrada")
        }
        await this._evaluationRepository.CloseEvaluation(evaluationFound.id)
        return true;
    }
}