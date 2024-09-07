import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GenerateInvoiceResponse } from "src/application/invoices/commands/generate-invoice/generate-invoice.response";
import { CreateProjectCommand } from "src/application/projects/commands/create-project/create-project.command";
import { CustomResponse } from "../dtos/response.model";
import { CreateProjectDto, UpdateProjectDto } from "../dtos/project.dto";
import { UpdateProjectCommand } from "src/application/projects/commands/update-project/update-project.command";
import { GetProjectsQuery } from "src/application/projects/queries/get-projects/get-projects.query";
import { Project } from "src/domain/projects/project";
import { GetProjectByIdQuery } from "src/application/projects/queries/get-project-by-id/get-project-by-id.query";
import { GetProjectByIdResponse } from "src/application/projects/queries/get-project-by-id/get-project-by-id.response";
import { GetProjectStatesQuery } from "src/application/projects/queries/get-project-states/get-project-states.query";
import { ProjectState } from "src/domain/projects/project-state";

@Controller('project')
export class ProjectController {

    constructor(
        private _queryBus: QueryBus,
        private _commandBus: CommandBus,
    ) { }

    @Post()
    async create(@Body() projectDto: CreateProjectDto) {
        let command = new CreateProjectCommand(
            projectDto.title,
            projectDto.description,
            projectDto.pricePerHour,
            projectDto.epicIds,
            projectDto.assignedId
        );

        const result = await this._commandBus.execute(command)

        const response = new CustomResponse<number>(
            `Project created`,
            result,
            null
        )

        return response
    }

    @Put(":id")
    async update(@Body() projectDto: UpdateProjectDto, @Param('id') id: string) {
        let command = new UpdateProjectCommand(
            Number(id),
            projectDto.title,
            projectDto.description,
            projectDto.epicIds,
            projectDto.pricePerHour,
            projectDto.assignedId,
            projectDto.stateId
        );
        const result = await this._commandBus.execute(command)

        const response = new CustomResponse<number>(
            `Project updated`,
            result,
            null
        )

        return response
    }

    @Get()
    async get() {
        const result = await this._queryBus.execute<GetProjectsQuery, Project[]>(new GetProjectsQuery())

        const response = new CustomResponse<Project[]>(
            `Projects found ${result.length}`,
            result,
            null
        )

        return response
    }

    @Get("states")
    async getStates() {
        const result = await this._queryBus.execute<GetProjectStatesQuery, ProjectState[]>(new GetProjectStatesQuery())

        const response = new CustomResponse<ProjectState[]>(
            `Projects state found ${result.length}`,
            result,
            null
        )

        return response
    }

    @Get(":id")
    async getById(@Param('id') id: string) {
        let query = new GetProjectByIdQuery(Number(id));
        const result = await this._queryBus.execute<GetProjectByIdQuery, GetProjectByIdResponse>(query)

        const response = new CustomResponse<GetProjectByIdResponse>(
            `Project found ${result.id}`,
            result,
            null
        )

        return response
    }

}
