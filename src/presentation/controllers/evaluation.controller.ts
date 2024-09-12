import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CustomResponse } from "../dtos/response.model";
import { SaveEvaluationDto } from "../dtos/evaluation.dto";
import { SaveEvaluationCommand } from "src/application/evaluation/commands/save-evaluation/save-evaluation.command";
import { CloseEvaluationCommand } from "src/application/evaluation/commands/close-evaluation/close-evaluation.command";
import { Evaluation } from "src/domain/evaluations/evaluation";
import { GetEvaluationsQuery } from "src/application/evaluation/queries/get-evaluations/get-evaluations.query";
import { GetCurrentEvaluationQuery } from "src/application/evaluation/queries/get-current-evaluation/get-current-evaluation.query";

@Controller('evaluation')
export class EvaluationController {

    constructor(
        private _commandBus: CommandBus,
        private _queryBus: QueryBus
    ) { }

    @Post()
    async save(@Body() evaluationDto: SaveEvaluationDto): Promise<CustomResponse<string>> {
        let command = new SaveEvaluationCommand(
            evaluationDto.score,
            evaluationDto.personId,
            evaluationDto.skillsToImprove,
            evaluationDto.skillsReached,
        )
        await this._commandBus.execute(command)

        const response = new CustomResponse<string>(
            `Evaluation saved`,
            `Evaluation saved`,
            null
        )

        return response
    }

    @Put("closed/person/:id")
    async getByProjectId(@Param('id') id: string): Promise<CustomResponse<string>> {
        const command = new CloseEvaluationCommand(Number(id))
        await this._commandBus.execute(command)

        const response = new CustomResponse<string>(
            `Evaluation Closed`,
            `Evaluation Closed`,
            null
        )

        return response
    }

    @Get("person/:id")
    async getByPersonId(@Param('id') id: string): Promise<CustomResponse<Evaluation[]>> {
        const query = new GetEvaluationsQuery(Number(id))
        const result: Evaluation[] = await this._queryBus.execute(query)

        const response = new CustomResponse<Evaluation[]>(
            `Evaluation found ${result.length}`,
            result,
            null
        )
        return response
    }

    @Get("person/current/:id")
    async getCurrentByPersonId(@Param('id') id: string): Promise<CustomResponse<Evaluation>> {
        const query = new GetCurrentEvaluationQuery(Number(id))
        const result: Evaluation = await this._queryBus.execute(query)

        const response = new CustomResponse<Evaluation>(
            `Evaluation`,
            result,
            null
        )

        return response
    }
}