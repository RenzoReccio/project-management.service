import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { DB_DATABASE, DB_HOST, DB_NAME_MONGO, DB_PASSWORD, DB_PORT, DB_URL_MONGO, DB_USER } from "src/config";
import { TaskRepository } from "./repositories/task.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProjectRepository } from "./repositories/project.repository";
import { CommentRepository } from "./repositories/comment.repository";
import { FeatureRepository } from "./repositories/feature.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { EventLogRepository } from "./repositories/event-log.repository";
import { EventLog, EventLogSchema } from "./schema/event-log.schema";
import { InvoiceRepository } from "./repositories/invoice.repository";
import { InvoiceDetailRepository } from "./repositories/invoice-detail.repository";

const services = [
    TaskRepository,
    ProjectRepository,
    CommentRepository,
    FeatureRepository,
    EventLogRepository,
    InvoiceRepository,
    InvoiceDetailRepository,
]
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: DB_HOST(),
                port: Number(DB_PORT()),
                username: DB_USER(),
                password: DB_PASSWORD(),
                database: DB_DATABASE(),
                synchronize: true,
                logging: false,
                entities: [join(__dirname, './entity/*.entity{.ts,.js}')],
            })
        }),
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: DB_URL_MONGO(),
                dbName: DB_NAME_MONGO()
            })
        }),
        MongooseModule.forFeature([{ name: EventLog.name, schema: EventLogSchema }])
    ],
    exports: [
        ...services
    ],
    providers: [
        ...services
    ]
})
export class InfraestructureModule { }