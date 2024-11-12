// src/dtos/follow-user.dto.ts
import { IsNumber } from 'class-validator';

export class FollowUserDto {
    @IsNumber()
    user_id_s: number;
}
