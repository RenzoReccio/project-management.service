import { Evaluation } from "src/domain/evaluations/evaluation";
import { EvaluationEntity } from "src/infrastructure/entity/evaluation.entity";
import { PersonMapper } from "./person.mapper";

export class EvaluationMapper {
    static mapEvaluationEntityToEvaluation(entity: EvaluationEntity): Evaluation {
        let model = new Evaluation(
            entity.id,
            entity.date,
            entity.score,
            entity.person ? PersonMapper.mapPersonEntityToPerson(entity.person) : null,
            entity.skillsToImprove,
            entity.skillsReached,
            entity.isClosed,
            entity.quantityScore
        );
        model.createdDate = entity.createdDate;
        model.updatedDate = entity.updatedDate;
        model.finalScore = Number(entity.finalScore);
        return model;
    }

}