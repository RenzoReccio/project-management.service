import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Evaluation } from "src/domain/evaluations/evaluation";
import { IEvaluationRepository } from "src/domain/evaluations/evaluation.repository";
import { GetCurrentEvaluationQuery } from "./get-current-evaluation.query";

@QueryHandler(GetCurrentEvaluationQuery)
export class GetCurrentEvaluationHandler implements IQueryHandler<GetCurrentEvaluationQuery, Evaluation> {

    constructor(
        private _evaluationRepository: IEvaluationRepository
    ) { }
    async execute(query: GetCurrentEvaluationQuery): Promise<Evaluation> {
        return await this._evaluationRepository.GetOneByDateAndPerson(new Date(), query.personId);
    }
}