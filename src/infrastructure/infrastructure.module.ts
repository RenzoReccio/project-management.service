import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "src/config";
import { TaskRepository } from "./repository/task.repository";
import { ConfigModule } from "@nestjs/config";

const services = [TaskRepository]
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
    ],
    exports: [
        ...services
    ],
    providers: [
        ...services
    ]
})
export class InfraestructureModule { }