import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password_hash: string;

    @Column()
    role: 'admin' | 'user';
}
