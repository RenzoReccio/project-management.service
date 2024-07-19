import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from 'src/application/projects/commands/create-project/create-project.command';
import { GetProjectsQuery } from 'src/application/projects/queries/get-projects/get-projects.query';
import { CustomResponse } from '../response/response.model';

@Controller('project')
export class ProjectController {
  constructor(
    private _queryBus: QueryBus,
    private _commandBus: CommandBus,
  ) { }

  @Get('')
  async getProjects(): Promise<any> {
    const query = new GetProjectsQuery();
    return new CustomResponse<any>(
      "Get tasks",
      await this._queryBus.execute(query),
      null
    )
  }

  @Get()
  getProjectById(): string {
    return "I'm not a fool";
  }

  @Post('create-project')
  async createProject() {
    const command = new CreateProjectCommand('12', 'project name');

    return await this._commandBus.execute(command);
  }

  @Put()
  updateProject() { }

  @Delete()
  removeProject() { }
}
