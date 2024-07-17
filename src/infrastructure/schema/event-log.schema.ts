import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type EventLogDocument = HydratedDocument<EventLog>;

@Schema({ collection: "eventLog" })
export class EventLog {
    @Prop({ name: "LogType" })
    LogType: string;
    @Prop({ name: "AppName" })
    AppName: string;
    @Prop({ name: "CreatedDate", type: Date })
    CreatedDate: Date;
    @Prop({ name: "ResourceUrl" })
    ResourceUrl: string;
    @Prop({ name: "Message" })
    Message: string;
    @Prop({ name: "StackTrace" })
    StackTrace: string;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);