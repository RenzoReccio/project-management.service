import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetEvaluationsQuery } from "./get-evaluations.query";
import { Evaluation } from "src/domain/evaluations/evaluation";
import { IEvaluationRepository } from "src/domain/evaluations/evaluation.repository";

@QueryHandler(GetEvaluationsQuery)
export class GetEvaluationsHandler implements IQueryHandler<GetEvaluationsQuery, Evaluation[]> {

    constructor(
        private _evaluationRepository: IEvaluationRepository

    ) { }
    async execute(query: GetEvaluationsQuery): Promise<Evaluation[]> {
        return await this._evaluationRepository.GetByPerson(query.personId)
    }
}