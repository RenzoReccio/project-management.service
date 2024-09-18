import { Evaluation } from "./evaluation";

export abstract class IEvaluationRepository {
    abstract CloseEvaluation(id: number): Promise<void>;
    abstract Insert(evaluation: Evaluation): Promise<number>;
    abstract Update(evaluation: Evaluation): Promise<boolean>;
    abstract GetOneByDateAndPerson(date: Date, personId: number): Promise<Evaluation>;
    abstract GetByPerson(personId: number): Promise<Evaluation[]>;
    abstract Get(): Promise<Evaluation[]>;

}