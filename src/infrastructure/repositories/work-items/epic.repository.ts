import { Injectable } from "@nestjs/common";
import { Comment } from "src/domain/work-items/comment";
import { Epic } from "src/domain/work-items/epics/epic";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { PersonEntity } from "src/infrastructure/entity/person.entity";
import { EpicCommentEntity } from "src/infrastructure/entity/epic-comment.entity";
import { EpicEntity } from "src/infrastructure/entity/epic.entity";
import { EpicMapper } from "../mappers/work-items/epic.mapper";
import { In, IsNull } from "typeorm";

@Injectable()
export class EpicRepository implements IEpicRepository {
    async GetByProjectId(projectId: number): Promise<Epic[]> {
        let resultEpic = await EpicEntity.find(
            {
                where: { project: { id: projectId } },
            },
        );
        return resultEpic.map(item => EpicMapper.mapEpicEntityToEpic(item));
    }
    async GetWithProjectIdNull(): Promise<Epic[]> {
        let resultEpic = await EpicEntity.find(
            {
                where: { project: IsNull() },
            },
        )

        return resultEpic.map(item => EpicMapper.mapEpicEntityToEpic(item));
    }

    async UpdateProjectIdMany(id: number, epicIds: number[]): Promise<boolean> {
        await EpicEntity.update({ project: { id: id } }, { project: null });
        let result = await EpicEntity.update({ id: In(epicIds) }, { project: { id: id } });
        return result.affected > 0
    }

    async GetBackLogByProjectId(projectId: number): Promise<Epic[]> {
        let resultEpic = await EpicEntity.find(
            {
                where: { project: { id: projectId } },
                relations: ["features", "features.userStories", "features.userStories.tasks"]
            },
        )

        return resultEpic.map(item => EpicMapper.mapEpicEntityToEpic(item));
    }

    public async GetById(epicId: number): Promise<Epic> {

        const result = this.mapProjectEntityToProject(
            await EpicEntity.findOneBy({ id: epicId })
        )

        return result
    }

    public async GetIdByExternalId(externalId: number): Promise<number> {

        const result = await EpicEntity.findOneBy({ externalId: externalId })

        return result?.id;
    }

    public async Insert(epic: Epic): Promise<number> {

        const projectInsert = await EpicEntity.save({
            externalId: epic.externalId,
            areaPath: epic.areaPath,
            teamProject: epic.teamProject,
            iterationPath: epic.iterationPath,
            state: epic.state,
            reason: epic.reason,
            createdDate: epic.createdDate,
            title: epic.title,
            description: epic.description,
            priority: epic.priority,
            valueArea: epic.valueArea,
            risk: epic.risk,
            businessValue: epic.businessValue,
            timeCriticality: epic.timeCriticality,
            effort: epic.effort,
            startDate: epic.startDate,
            targetDate: epic.targetDate,
            url: epic.url,
            pageUrl: epic.pageUrl,
            tags: epic.tags,
        });

        return projectInsert.id;
    }

    public async InsertComment(epicId: number, comments: Comment[]): Promise<Comment[]> {

        let commentsMapped = comments.map(item => {

            let comment: EpicCommentEntity = {
                date: item.date,
                createdBy: { id: item?.user?.id } as PersonEntity,
                text: item.text,
                epic: { id: epicId } as EpicEntity,
            } as EpicCommentEntity

            return comment
        })

        let commentsInsert = await EpicCommentEntity.save(commentsMapped)

        let result = commentsInsert.map(item => {

            return new Comment({
                id: item.id,
                date: item.date,
                user: null,
                text: item.text
            })
        })

        return Promise.resolve(result)
    }

    public async Update(id: number, epic: Epic): Promise<boolean> {

        let projectUpdate = await EpicEntity.save({
            id: id,
            externalId: epic.externalId,
            areaPath: epic.areaPath,
            teamProject: epic.teamProject,
            iterationPath: epic.iterationPath,
            state: epic.state,
            reason: epic.reason,
            createdDate: epic.createdDate,
            title: epic.title,
            description: epic.description,
            priority: epic.priority,
            valueArea: epic.valueArea,
            risk: epic.risk,
            businessValue: epic.businessValue,
            timeCriticality: epic.timeCriticality,
            effort: epic.effort,
            startDate: epic.startDate,
            targetDate: epic.targetDate,
            url: epic.url,
            pageUrl: epic.pageUrl,
            tags: epic.tags,
        });

        return projectUpdate != null;
    }

    public async UpdateAssignedPerson(id: number, epic: Epic): Promise<boolean> {

        let projectUpdate = await EpicEntity.save({
            id: id,
            assignedTo: epic.assignedTo != null ? { id: epic.assignedTo.id } : null,
        });

        return projectUpdate != null;
    }

    public async DeleteComment(epicId: number): Promise<number> {

        const result = await EpicCommentEntity.delete({ epic: { id: epicId } })

        return result.affected
    }

    private mapProjectEntityToProject(epicEntity: EpicEntity): Epic {

        const epic = new Epic({
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
        })

        return epic
    }
}
