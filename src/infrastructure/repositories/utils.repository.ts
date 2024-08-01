import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUtilsRepository } from "src/domain/utils/utils.repository";
import { EventLog } from "../schema/event-log.schema";

@Injectable()
export class UtilsRepository implements IUtilsRepository {

    constructor(
        @InjectModel(EventLog.name) private eventLog: Model<EventLog>
    ) { }

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
