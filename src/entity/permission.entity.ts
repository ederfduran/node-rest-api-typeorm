import {Column, Entity, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}