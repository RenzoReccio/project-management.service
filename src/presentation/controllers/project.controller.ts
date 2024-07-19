import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from 'src/application/projects/commands/create-project/create-project.command';
import { GetProjectsQuery } from 'src/application/projects/queries/get-projects/get-projects.query';

@Controller('project')
export class ProjectController {
  constructor(
    private _queryBus: QueryBus,
    private _commandBus: CommandBus,
  ) {}

  @Get('')
  async getProjects(): Promise<string> {
    const query = new GetProjectsQuery();

    return this._queryBus.execute(query);
  }

  @Get()
  getProjectById(): string {
    return "I'm not a fool";
  }

  @Post('create-project')
  createProject() {
    const command = new CreateProjectCommand('12', 'project name');

    return this._commandBus.execute(command);
  }

  @Put()
  updateProject() {}

  @Delete()
  removeProject() {}
}
