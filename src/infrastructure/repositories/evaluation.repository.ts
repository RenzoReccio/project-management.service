import { Evaluation } from "src/domain/evaluations/evaluation";
import { IEvaluationRepository } from "src/domain/evaluations/evaluation.repository";
import { EvaluationEntity } from "../entity/evaluation.entity";
import { EvaluationMapper } from "./mappers/evaluation.mapper";

export class EvaluationRepository implements IEvaluationRepository {
    async Get(): Promise<Evaluation[]> {
        let result = await EvaluationEntity.find(
            { order: { createdDate: "DESC" }, relations: ["person"] },
        )
        return result.map(EvaluationMapper.mapEvaluationEntityToEvaluation);
    }
    async CloseEvaluation(id: number): Promise<void> {
        await EvaluationEntity.save({
            id: id,
            isClosed: true
        })
    }

    async Insert(evaluation: Evaluation): Promise<number> {
        const date = new Date(evaluation.date.getFullYear(), evaluation.date.getMonth(), 1);

        let inserted = await EvaluationEntity.save({
            date: date,
            score: evaluation.score,
            person: { id: evaluation.person.id },
            skillsToImprove: evaluation.skillsToImprove,
            skillsReached: evaluation.skillsReached,
            isClosed: evaluation.isClosed,
            finalScore: evaluation.finalScore,
            quantityScore: evaluation.quantityScore
        })
        return inserted.id;
    }
    async Update(evaluation: Evaluation): Promise<boolean> {
        const date = new Date(evaluation.date.getFullYear(), evaluation.date.getMonth(), 1);

        let inserted = await EvaluationEntity.save({
            id: evaluation.id,
            date: date,
            score: evaluation.score,
            person: { id: evaluation.person.id },
            skillsToImprove: evaluation.skillsToImprove,
            skillsReached: evaluation.skillsReached,
            isClosed: evaluation.isClosed,
            finalScore: evaluation.finalScore,
            quantityScore: evaluation.quantityScore
        })
        return inserted.id > 0;
    }
    async GetOneByDateAndPerson(date: Date, personId: number): Promise<Evaluation> {
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let evaluationEntity = await EvaluationEntity.createQueryBuilder('evaluation')
            .leftJoinAndSelect('evaluation.person', 'person')
            .where('EXTRACT(MONTH FROM evaluation.date) = :month', { month })
            .andWhere('EXTRACT(YEAR FROM evaluation.date) = :year', { year })
            .andWhere('person.id = :personId', { personId })
            .getOne();

        return evaluationEntity ? EvaluationMapper.mapEvaluationEntityToEvaluation(evaluationEntity) : null
    }
    async GetByPerson(personId: number): Promise<Evaluation[]> {
        let result = await EvaluationEntity.find(
            { where: { person: { id: personId } }, order: { id: "DESC" } },
        )
        return result.map(EvaluationMapper.mapEvaluationEntityToEvaluation);
    }

}