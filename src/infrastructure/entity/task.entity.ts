import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { UserStoryEntity } from './user-story.entity';
import { PersonEntity } from './person.entity';

@Entity()
export class TaskEntity extends BaseEntity {
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
  assignedTo: PersonEntity

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  priority: number;

  @Column({ nullable: true })
  remainingWork: number;

  @Column({ nullable: true })
  originalEstimate: number;

  @Column({ nullable: true })
  completedWork: number;

  @Column({ nullable: true })
  activity: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  pageUrl: string;

  @ManyToOne(() => UserStoryEntity, { nullable: true })
  userStoryParent: UserStoryEntity
}