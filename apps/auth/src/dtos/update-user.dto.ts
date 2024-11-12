import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    last_name?: string;

    @IsEnum(['admin', 'user'])
    @IsOptional()
    role?: 'admin' | 'user';
}
