import { Task } from "./task";

export abstract class ITaskRepository {
    abstract Insert(task: Task): Promise<number>;
    abstract GetIdByExternalId(externalId: number): Promise<number>;
    abstract Update(id: number, task: Task): Promise<boolean>;
    abstract Get(): Promise<any>
}