// src/message.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../auth/src/user.entity'; // Relación con la entidad User en UserAuthService

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    message_id: number;

    @Column()
    user_id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;
}
