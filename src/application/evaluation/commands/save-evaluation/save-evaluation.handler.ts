import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SaveEvaluationCommand } from "./save-evaluation.command";
import { IEvaluationRepository } from "src/domain/evaluations/evaluation.repository";
import { Evaluation } from "src/domain/evaluations/evaluation";
import { Person } from "src/domain/work-items/person";
import { ITaskRepository } from "src/domain/work-items/tasks/task.repository";
import { IPersonRepository } from "src/domain/work-items/person.repository";
import { ValidationException } from "src/application/exceptions/validation.expection";

@CommandHandler(SaveEvaluationCommand)
export class SaveEvaluationHandler implements ICommandHandler<SaveEvaluationCommand, boolean> {

    constructor(
        private _evaluationRepository: IEvaluationRepository,
        private _taskRepository: ITaskRepository,
        private _personRepository: IPersonRepository
    ) { }

    async execute(command: SaveEvaluationCommand): Promise<boolean> {
        let currentDate = new Date();
        let evaluationFound = await this._evaluationRepository.GetOneByDateAndPerson(currentDate, command.personId);
        if (evaluationFound?.isClosed === true) {
            throw new ValidationException("La evaluación ya esta cerrada")
        }
        let closedTask = await this.GetClosedTaskForCurrentPerson(currentDate, command.personId);
        let closedTaskForCurrent = await this.GetClosedTasks(currentDate);
        let persons = (await this._personRepository.Get()).length
        let quantityScore = Math.round(closedTaskForCurrent / ((closedTask / persons)) * 10);
        quantityScore = quantityScore > 10 ? 10 : quantityScore;
        !evaluationFound ? this.insertEvaluation(command, currentDate, quantityScore) : this.updateEvaluation(command, currentDate, evaluationFound.id, quantityScore)
        return true;
    }

    private async GetClosedTaskForCurrentPerson(currentDate: Date, personId: number) {
        return await this._taskRepository.GetNumberClosedTaskForPersonId(currentDate.getMonth(), currentDate.getFullYear(), personId);
    }

    private async GetClosedTasks(currentDate: Date) {
        return await this._taskRepository.GetNumberClosedTasks(currentDate.getMonth() + 1, currentDate.getFullYear());
    }

    async updateEvaluation(command: SaveEvaluationCommand, currentDate: Date, id: number, quantityScore: number) {
        let evaluation = new Evaluation(
            id,
            currentDate,
            command.score,
            { id: command.personId } as Person,
            command.skillsToImprove,
            command.skillsReached,
            false,
            quantityScore
        )
        console.log(evaluation)
        await this._evaluationRepository.Update(evaluation);
    }
    async insertEvaluation(command: SaveEvaluationCommand, currentDate: Date, quantityScore: number) {
        let evaluation = new Evaluation(
            null,
            currentDate,
            command.score,
            { id: command.personId } as Person,
            command.skillsToImprove,
            command.skillsReached,
            false,
            quantityScore
        )
        evaluation.id = await this._evaluationRepository.Insert(evaluation)
    }

}