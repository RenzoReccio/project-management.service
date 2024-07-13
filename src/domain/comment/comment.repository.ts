import { Comment } from "./comment";

export abstract class ICommentRepository {
    abstract DeleteFromProjectId(projectId: number): Promise<number>;
    abstract InsertForProject(projectId: number, comments: Comment[]): Promise<Comment[]>;
    abstract DeleteFromFeatureId(featureId: number): Promise<number>;
    abstract InsertForFeature(featureId: number, comments: Comment[]): Promise<Comment[]>;
    abstract DeleteFromUserStoryId(userStoryId: number): Promise<number>;
    abstract InsertForUserStory(userStoryId: number, comments: Comment[]): Promise<Comment[]>;
    abstract DeleteFromTaskId(taskId: number): Promise<number>;
    abstract InsertForTask(taskId: number, comments: Comment[]): Promise<Comment[]>;
}