import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { PersonEntity } from './person.entity';
import { EpicEntity } from './epic.entity';
import { UserStoryEntity } from './user-story.entity';

@Entity("feature")
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

    @ManyToOne(() => EpicEntity, { nullable: true })
    epic: EpicEntity;

    @Column({ nullable: true })
    url: string;

    @Column({ nullable: true })
    pageUrl: string;

    @OneToMany(() => UserStoryEntity, (userStory) => userStory.feature)
    userStories: UserStoryEntity[]
}