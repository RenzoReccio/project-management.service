import { Feature } from "./feature";

export abstract class IFeatureRepository {
    abstract Insert(feature: Feature, projectId: number): Promise<number>;
    abstract GetIdByExternalId(externalId: number): Promise<number>;
    abstract Update(id: number, feature: Feature, projectId: number): Promise<boolean>;
    abstract UpdateAssignedPerson(id: number, feature: Feature): Promise<boolean>;
}