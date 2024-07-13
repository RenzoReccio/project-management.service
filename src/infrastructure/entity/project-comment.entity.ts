import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
import { ProjectEntity } from "./project.entity";

@Entity()
export class ProjectCommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    date: Date;

    @ManyToOne(() => PersonEntity)
    createdBy: PersonEntity;

    @Column({ nullable: true })
    text: string;

    @ManyToOne(() => ProjectEntity)
    project: ProjectEntity
}