import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(['admin', 'user'])
    role: 'admin' | 'user';
}
