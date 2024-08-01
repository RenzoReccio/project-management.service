import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import {
    DB_DATABASE,
    DB_HOST,
    DB_NAME_MONGO,
    DB_PASSWORD,
    DB_PORT,
    DB_URL_MONGO,
    DB_USER,
} from "src/config";
import { EventLog, EventLogSchema } from "./schema/event-log.schema";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: "postgres",
                host: DB_HOST(),
                port: Number(DB_PORT()),
                username: DB_USER(),
                password: DB_PASSWORD(),
                database: DB_DATABASE(),
                synchronize: true,
                logging: false,
                entities: [join(__dirname, "./entity/*.entity{.ts,.js}")],
            }),
        }),
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: DB_URL_MONGO(),
                dbName: DB_NAME_MONGO(),
            }),
        }),
        MongooseModule.forFeature([
            { name: EventLog.name, schema: EventLogSchema },
        ]),
    ],
    providers: [],
})

export class InfrastructureModule { }
