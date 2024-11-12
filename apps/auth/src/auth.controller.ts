// src/auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Login - No debe usar el guardia JwtAuthGuard
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        return this.authService.login(user);
    }

    // Solo los endpoints protegidos usan el guardia JwtAuthGuard
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('users')
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log('Creating user');
        return this.authService.createUser(createUserDto);
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('users')
    getAllUsers() {
        return this.authService.getAllUsers();
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('users/:id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.authService.updateUser(id, updateUserDto);
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('users/:id')
    deleteUser(@Param('id') id: number) {
        return this.authService.deleteUser(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
