// src/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersRepository.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.password_hash))) {
            const { password_hash, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.user_id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async createUser(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.usersRepository.createUser({ ...createUserDto, password_hash: hashedPassword });
    }

    async getAllUsers() {
        return this.usersRepository.findAllUsers();
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findById(id);
        if (!user) throw new NotFoundException('User not found');
        Object.assign(user, updateUserDto);
        return this.usersRepository.updateUser(id, user);
    }

    async deleteUser(id: number) {
        const user = await this.usersRepository.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return this.usersRepository.deleteUser(id);
    }
}