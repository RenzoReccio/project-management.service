import { Epic } from "src/domain/work-items/epics/epic";
import { EpicEntity } from "src/infrastructure/entity/epic.entity";
import { FeatureMapper } from "./feature.mapper";

export class EpicMapper {
  public static mapEpicEntityToEpic(epicEntity: EpicEntity): Epic {
    return new Epic({
      id: epicEntity.id,
      externalId: epicEntity.externalId,
      areaPath: epicEntity.areaPath,
      teamProject: epicEntity.teamProject,
      iterationPath: epicEntity.iterationPath,
      state: epicEntity.state,
      reason: epicEntity.reason,
      assignedTo: null,
      createdDate: epicEntity.createdDate,
      title: epicEntity.title,
      description: epicEntity.description,
      priority: epicEntity.priority,
      valueArea: epicEntity.valueArea,
      risk: epicEntity.risk,
      businessValue: epicEntity.businessValue,
      timeCriticality: epicEntity.timeCriticality,
      effort: epicEntity.effort,
      startDate: epicEntity.startDate,
      targetDate: epicEntity.targetDate,
      url: epicEntity.url,
      pageUrl: epicEntity.pageUrl,
      tags: epicEntity.tags,
      comments: [],
      features: epicEntity.features ? epicEntity.features.map(item => FeatureMapper.mapFeatureEntityToFeature(item)) : []
    });
  }
}
