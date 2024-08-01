import { Comment } from "../comment";
import { Task } from "./task";

export abstract class ITaskRepository {

    abstract Get(): Promise<Task[]>

    abstract GetClosedTasks(month: number, year: number): Promise<Task[]>

    abstract GetIdByExternalId(externalId: number): Promise<number>;
    
    abstract Insert(task: Task, userStoryId: number): Promise<number>;

    abstract InsertComment(taskId: number, comments: Comment[]): Promise<Comment[]>;

    abstract Update(id: number, task: Task, userStoryId: number): Promise<boolean>;

    abstract UpdateAssignedPerson(id: number, task: Task): Promise<boolean>;

    abstract DeleteComment(taskId: number): Promise<number>;

}