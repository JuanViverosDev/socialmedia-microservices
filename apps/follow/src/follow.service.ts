// src/follow.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow)
        private readonly followRepository: Repository<Follow>,
    ) {}

    async followUser(userId: number, followUserId: number) {
        const follow = this.followRepository.create({ user_id_p: userId, user_id_s: followUserId });
        return this.followRepository.save(follow);
    }

    async unfollowUser(userId: number, followUserId: number) {
        await this.followRepository.delete({ user_id_p: userId, user_id_s: followUserId });
        return { message: 'Unfollowed successfully' };
    }

    async getFollowedUsers(userId: number) {
        return this.followRepository.find({ where: { user_id_p: userId } });
    }
}
