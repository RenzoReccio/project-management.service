import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUtilsRepository } from "src/domain/utils/utils.repository";
import { EventLog } from "../schema/event-log.schema";
import { OpenAI } from "openai";
import * as fs from "fs";
import { promises as fsPromises } from 'fs';
import { OPENAI_ASSISTANT_AI, OPENAI_KEY } from "src/config";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UtilsRepository implements IUtilsRepository {
    readonly openai: OpenAI
    constructor(
        @InjectModel(EventLog.name) private eventLog: Model<EventLog>
    ) {
        this.openai = new OpenAI({ apiKey: OPENAI_KEY() });
    }
    async UploadJsonToOpenAI(project: any): Promise<boolean> {

        let uuid = uuidv4()

        await fsPromises.writeFile(`db-${uuid}.json`, JSON.stringify(project), 'utf8');

        const fileStreams = [`db-${uuid}.json`].map((path) =>
            fs.createReadStream(path),
        );

        let vectorStore = await this.openai.beta.vectorStores.create({
            name: `VC-Projects-${uuid}`,
        });

        await this.openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, { files: fileStreams })

        await this.openai.beta.assistants.update(OPENAI_ASSISTANT_AI(), {
            tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
        });
        return true
    }

    async GetLogs(top: number): Promise<any> {
        const result = await this.eventLog
            .find({})
            .sort([["CreatedDate", -1]])
            .limit(top)
            .exec();

        return result;
    }

    async InsertLog(resourceURL: string, message: string): Promise<boolean> {

        try {
            var logEvent = new this.eventLog({
                LogType: "INFO",
                AppName: "SERVICE",
                CreatedDate: new Date(),
                ResourceUrl: resourceURL,
                Message: message,
                StackTrace: new Error().stack,
            });

            await logEvent.save();

            return true;
        }
        catch (error) {
            return false;
        }
    }

    async InsertErrorLog(resourceURL: string, message: string): Promise<boolean> {

        try {
            var logEvent = new this.eventLog({
                LogType: "ERROR",
                AppName: "SERVICE",
                CreatedDate: new Date(),
                ResourceUrl: resourceURL,
                Message: message,
                StackTrace: new Error().stack,
            });

            await logEvent.save();

            return true;
        }
        catch (error) {
            return false;
        }
    }
}
