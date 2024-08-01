import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";
import { PersonEntity } from "./person.entity";

@Entity("taskComment")
export class TaskCommentEntity  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    date: Date;

    @ManyToOne(() => PersonEntity)
    createdBy: PersonEntity;

    @Column({ nullable: true })
    text: string;

    @ManyToOne(() => TaskEntity)
    task: TaskEntity
}