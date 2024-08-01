import { Injectable } from "@nestjs/common";
import { Comment } from "src/domain/work-items/comment";
import { Epic } from "src/domain/work-items/epics/epic";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { PersonEntity } from "src/infrastructure/entity/person.entity";
import { ProjectCommentEntity } from "src/infrastructure/entity/project-comment.entity";
import { ProjectEntity } from "src/infrastructure/entity/project.entity";

@Injectable()
export class EpicRepository implements IEpicRepository {

    public async Get(): Promise<any> {

        const result = await ProjectEntity.find({
            relations: ["assignedTo", "comments", "comments.createdBy"],
        });

        return result;
    }

    public async GetById(epicId: number): Promise<Epic> {

        const result = this.mapProjectEntityToProject(
            await ProjectEntity.findOneBy({ id: epicId })
        )

        return result
    }

    public async GetIdByExternalId(externalId: number): Promise<number> {

        const result = await ProjectEntity.findOneBy({ externalId: externalId })

        return result?.id;
    }

    public async Insert(epic: Epic): Promise<number> {

        const projectInsert = await ProjectEntity.save({
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

    public async InsertComment(projectId: number, comments: Comment[]): Promise<Comment[]> {

        let commentsMapped = comments.map(item => {

            let comment: ProjectCommentEntity = {
                date: item.date,
                createdBy: { id: item?.user?.id } as PersonEntity,
                text: item.text,
                project: { id: projectId } as ProjectEntity,
            } as ProjectCommentEntity

            return comment
        })

        let commentsInsert = await ProjectCommentEntity.save(commentsMapped)

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

        let projectUpdate = await ProjectEntity.save({
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

        let projectUpdate = await ProjectEntity.save({
            id: id,
            assignedTo: epic.assignedTo != null ? { id: epic.assignedTo.id } : null,
        });

        return projectUpdate != null;
    }

    public async DeleteComment(projectId: number): Promise<number> {

        const result = await ProjectCommentEntity.delete({ project: { id: projectId } })

        return result.affected
    }

    private mapProjectEntityToProject(projectEntity: ProjectEntity): Epic {

        const epic = new Epic({
            id: projectEntity.id,
            externalId: projectEntity.externalId,
            areaPath: projectEntity.areaPath,
            teamProject: projectEntity.teamProject,
            iterationPath: projectEntity.iterationPath,
            state: projectEntity.state,
            reason: projectEntity.reason,
            assignedTo: null,
            createdDate: projectEntity.createdDate,
            title: projectEntity.title,
            description: projectEntity.description,
            priority: projectEntity.priority,
            valueArea: projectEntity.valueArea,
            risk: projectEntity.risk,
            businessValue: projectEntity.businessValue,
            timeCriticality: projectEntity.timeCriticality,
            effort: projectEntity.effort,
            startDate: projectEntity.startDate,
            targetDate: projectEntity.targetDate,
            url: projectEntity.url,
            pageUrl: projectEntity.pageUrl,
            tags: projectEntity.tags,
            comments: [],
        })

        return epic
    }
}
