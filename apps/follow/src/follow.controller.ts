// src/follow.controller.ts
import { Controller, Post, Body, Delete, UseGuards, Request, Get } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { FollowUserDto } from './dtos/follow-user.dto';

@Controller('follow')
@UseGuards(JwtAuthGuard)
export class FollowController {
    constructor(private readonly followService: FollowService) {}

    @Post()
    followUser(@Body() followUserDto: FollowUserDto, @Request() req) {
        return this.followService.followUser(req.user.userId, followUserDto.user_id_s);
    }

    @Delete()
    unfollowUser(@Body() followUserDto: FollowUserDto, @Request() req) {
        return this.followService.unfollowUser(req.user.userId, followUserDto.user_id_s);
    }

    @Get('followed')
    getFollowedUsers(@Request() req) {
        return this.followService.getFollowedUsers(req.user.userId);
    }
}
