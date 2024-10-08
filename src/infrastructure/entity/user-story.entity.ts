import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
import { FeatureEntity } from "./feature.entity";
import { TaskEntity } from "./task.entity";

@Entity("userStory")
export class UserStoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    areaPath: string;

    @Column({ nullable: true })
    teamProject: string;

    @Column({ nullable: true })
    iterationPath: string;

    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true })
    reason: string;

    @ManyToOne(() => PersonEntity, { nullable: true })
    assignedTo: PersonEntity;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    boardColumn: string;

    @Column({ nullable: true })
    boardColumnDone: boolean;

    @Column({ nullable: true })
    priority: number;

    @Column({ nullable: true })
    valueArea: string;

    @Column({ nullable: true })
    risk: string;

    @Column({ nullable: true })
    kanbanColumn: string;

    @Column({ nullable: true })
    kanbanColumnDone: boolean;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    acceptanceCriteria: string;

    @Column({ nullable: true })
    tags: string;

    @ManyToOne(() => FeatureEntity, { nullable: true })
    feature: FeatureEntity;

    @Column({ nullable: true })
    url: string;

    @Column({ nullable: true })
    pageUrl: string;

    @Column({ nullable: true })
    externalId: number;

    @OneToMany(() => TaskEntity, (task) => task.userStory)
    tasks: TaskEntity[]
}