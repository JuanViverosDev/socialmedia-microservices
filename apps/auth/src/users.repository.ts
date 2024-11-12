// users.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    // Encuentra un usuario por su nombre de usuario
    async findByUsername(username: string): Promise<User | undefined> {
        return this.repository.findOne({ where: { username } });
    }

    // Crea un nuevo usuario
    async createUser(user: Partial<User>): Promise<User> {
        const newUser = this.repository.create(user);
        return this.repository.save(newUser);
    }

    // Encuentra todos los usuarios
    async findAllUsers(): Promise<User[]> {
        return this.repository.find();
    }

    // Encuentra un usuario por su ID
    async findById(userId: number): Promise<User> {
        const user = await this.repository.findOne({ where: { user_id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }

    // Actualiza un usuario
    async updateUser(userId: number, updateData: Partial<User>): Promise<User> {
        await this.repository.update(userId, updateData);
        return this.findById(userId);
    }

    // Elimina un usuario
    async deleteUser(userId: number): Promise<void> {
        const result = await this.repository.delete(userId);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
    }
}
