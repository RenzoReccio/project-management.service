import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectStateEntity } from "./project-state.entity";
import { PersonEntity } from "./person.entity";

@Entity("project")
export class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column('decimal', { nullable: false, default: 1 })
    pricePerHour: number;

    @CreateDateColumn()
    createdDate: Date;

    @ManyToOne(() => ProjectStateEntity, { nullable: true })
    state: ProjectStateEntity;

    @ManyToOne(() => PersonEntity, { nullable: true })
    assigned: PersonEntity;
}