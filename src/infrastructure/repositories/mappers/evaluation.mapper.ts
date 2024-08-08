import { Evaluation } from "src/domain/evaluations/evaluation";
import { EvaluationEntity } from "src/infrastructure/entity/evaluation.entity";

export class EvaluationMapper {
    static mapEvaluationEntityToEvaluation(entity: EvaluationEntity): Evaluation {
        let model = new Evaluation(
            entity.id,
            entity.date,
            entity.score,
            null,
            entity.skillsToImprove,
            entity.skillsReached,
            entity.isClosed
        );
        model.createdDate = entity.createdDate;
        model.updatedDate = entity.updatedDate;
        return model;
    }

}