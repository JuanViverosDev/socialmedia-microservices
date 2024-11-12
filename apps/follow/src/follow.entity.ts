// src/follow.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('follows')
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id_p: number;  // Usuario principal

    @Column()
    user_id_s: number;  // Usuario seguidor
}
