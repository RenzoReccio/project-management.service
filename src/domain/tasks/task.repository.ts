import { Task } from "./task";

export abstract class ITaskRepository {
    abstract Insert(task: Task, userStoryId: number): Promise<number>;
    abstract GetIdByExternalId(externalId: number): Promise<number>;
    abstract Update(id: number, task: Task, userStoryId: number): Promise<boolean>;
    abstract UpdateAssignedPerson(id: number, task: Task): Promise<boolean>;
    abstract Get(): Promise<any>
    abstract GetClosedTasks(month: number, year: number): Promise<Task[]>
}