import { Comment } from "../comment";
import { Feature } from "./feature";

export abstract class IFeatureRepository {

    abstract GetIdByExternalId(externalId: number): Promise<number>;

    abstract Insert(feature: Feature, projectId: number): Promise<number>;

    abstract InsertComment(featureId: number, comments: Comment[]): Promise<Comment[]>;
    
    abstract Update(id: number, feature: Feature, projectId: number): Promise<boolean>;

    abstract UpdateAssignedPerson(id: number, feature: Feature): Promise<boolean>;

    abstract DeleteComment(featureId: number): Promise<number>;

}