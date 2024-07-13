import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
import { UserStoryEntity } from "./user-story.entity";

@Entity()
export class UserStoryCommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    date: Date;

    @ManyToOne(() => PersonEntity)
    createdBy: PersonEntity;

    @Column({ nullable: true })
    text: string;

    @ManyToOne(() => UserStoryEntity)
    userStory: UserStoryEntity
}