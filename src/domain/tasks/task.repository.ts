import { Task } from "./task";

export interface ITaskRepository {
    Insert(task: Task): Promise<number>;
    GetIdByExternalId(externalId: number): Promise<number>;
    Update(id: number, task: Task): Promise<boolean>;
    Get(): Promise<any>
}