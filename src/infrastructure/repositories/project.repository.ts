import { Injectable } from "@nestjs/common";
import { Project } from "src/domain/projects/project";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { ProjectEntity } from "../entity/project.entity";
import { ProjectMapper } from "./mappers/project.mapper";
import { ProjectState } from "src/domain/projects/project-state";
import { ProjectStateEntity } from "../entity/project-state.entity";
import { PersonEntity } from "../entity/person.entity";

@Injectable()
export class ProjectRepository implements IProjectRepository {
    async GetWithRelations(): Promise<Project[]> {
        let resultProjects = await ProjectEntity.find(
            {
                relations: ["state", "epics", "epics.features", "epics.features.userStories", "epics.features.userStories.tasks",
                    "epics.features.userStories.tasks.assignedTo"
                ]
            },
        )
        return resultProjects.map(item => ProjectMapper.mapProjectEntityToProject(item));
    }
    public async GetProjectStates(): Promise<ProjectState[]> {
        return await ProjectStateEntity.find();
    }

    public async Get(): Promise<Project[]> {
        let result = await ProjectEntity.find({ relations: ["state"] });
        return result.map(item => ProjectMapper.mapProjectEntityToProject(item));
    }

    public async GetById(projectId: number): Promise<Project> {
        let result = await ProjectEntity.findOne(
            {
                relations: ["state", "assigned"],
                where: { id: projectId },
                order: { id: "DESC" }
            });
        return ProjectMapper.mapProjectEntityToProject(result)
    }

    public async Insert(project: Project): Promise<number> {
        let projectInsert = await ProjectEntity.save({
            title: project.title,
            description: project.description,
            pricePerHour: project.pricePerHour,
            state: { id: project.state.id } as ProjectStateEntity,
            assigned: { id: project.assigned.id } as PersonEntity
        })

        return projectInsert.id
    }

    public async Update(projectId: number, project: Project): Promise<boolean> {
        let projectInsert = await ProjectEntity.save({
            id: projectId,
            title: project.title,
            description: project.description,
            pricePerHour: project.pricePerHour,
            state: { id: project.state.id } as ProjectStateEntity,
            assigned: { id: project.assigned.id } as PersonEntity
        })

        return projectInsert.id > 0
    }

    public Delete(projectId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}