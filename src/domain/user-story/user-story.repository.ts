import { UserStory } from "./user-story";

export abstract class IUserStoryRepository {
    abstract Insert(userStory: UserStory, featureId: number): Promise<number>;
    abstract GetIdByExternalId(externalId: number): Promise<number>;
    abstract Update(id: number, userStory: UserStory, featureId: number): Promise<boolean>;
    abstract UpdateAssignedPerson(id: number, userStory: UserStory): Promise<boolean>;
}