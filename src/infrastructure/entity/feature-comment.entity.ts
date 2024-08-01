import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
import { FeatureEntity } from "./feature.entity";

@Entity("featureComment")
export class FeatureCommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    date: Date;

    @ManyToOne(() => PersonEntity)
    createdBy: PersonEntity;

    @Column({ nullable: true })
    text: string;

    @ManyToOne(() => FeatureEntity)
    feature: FeatureEntity
}