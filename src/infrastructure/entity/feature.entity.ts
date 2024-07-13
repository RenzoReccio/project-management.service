import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { PersonEntity } from './person.entity';
import { ProjectEntity } from './project.entity';

@Entity()
export class FeatureEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    externalId: number;

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
    createdDate: Date;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    priority: number;

    @Column({ nullable: true })
    valueArea: string;

    @Column({ nullable: true })
    risk: string;

    @Column({ nullable: true })
    targetDate: Date;

    @Column({ nullable: true })
    businessValue: number;

    @Column({ nullable: true })
    timeCriticality: number;

    @Column({ nullable: true })
    effort: number;

    @Column({ nullable: true })
    startDate: Date;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    tags: string;

    @ManyToOne(() => ProjectEntity, { nullable: true })
    parentProject: ProjectEntity;

    @Column({ nullable: true })
    url: string;

    @Column({ nullable: true })
    pageUrl: string;
}