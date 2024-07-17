import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IEventLogRepository } from 'src/domain/event-log/event-log.repository';
import { EventLog } from '../schema/event-log.schema';

@Injectable()
export class EventLogRepository implements IEventLogRepository {
    constructor(@InjectModel(EventLog.name) private eventLog: Model<EventLog>) { }
    async InsertLog(resourceURL: string, message: string): Promise<boolean> {
        console.log(resourceURL)
        try {
            var logEvent = new this.eventLog({
                LogType: "INFO",
                AppName: "SERVICE",
                CreatedDate: new Date(),
                ResourceUrl: resourceURL,
                Message: message,
                StackTrace: new Error().stack
            })
            await logEvent.save()
            return true;

        } catch (error) {
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
                StackTrace: new Error().stack
            })
            await logEvent.save()
            return true;

        } catch (error) {
            return false;
        }
    }
}
