import { Comment } from "../comment";
import { Epic } from "./epic";

export abstract class IEpicRepository {

    abstract Get(): Promise<Epic[]>;

    abstract GetById(id: number): Promise<Epic>;

    abstract GetIdByExternalId(externalId: number): Promise<number>;

    abstract Insert(epic: Epic): Promise<number>;

    abstract InsertComment(projectId: number, comments: Comment[]): Promise<Comment[]>

    abstract Update(id: number, project: Epic): Promise<boolean>;

    abstract UpdateAssignedPerson(id: number, project: Epic): Promise<boolean>;

    abstract DeleteComment(projectId: number): Promise<number>;

}