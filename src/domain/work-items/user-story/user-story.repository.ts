import { Comment } from "../comment";
import { UserStory } from "./user-story";

export abstract class IUserStoryRepository {

    abstract GetIdByExternalId(externalId: number): Promise<number>;

    abstract Insert(userStory: UserStory, featureId: number): Promise<number>;

    abstract InsertComment(userStoryId: number, comments: Comment[]): Promise<Comment[]>;

    abstract Update(id: number, userStory: UserStory, featureId: number): Promise<boolean>;

    abstract UpdateAssignedPerson(id: number, userStory: UserStory): Promise<boolean>;
    
    abstract DeleteComment(userStoryId: number): Promise<number>;

}