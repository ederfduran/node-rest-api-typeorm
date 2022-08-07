import { Role } from './role.entity';
import { BaseEntity,
        Column,
        Entity,
        PrimaryGeneratedColumn,
        ManyToOne,
        JoinColumn
    } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @ManyToOne( () => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role
}