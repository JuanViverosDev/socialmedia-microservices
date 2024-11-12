// src/message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Message } from './message.entity';
import axios from 'axios';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  // Método para crear un mensaje
  async createMessage(userId: number, content: string) {
    const message = this.messageRepository.create({ user_id: userId, content });
    return this.messageRepository.save(message);
  }

  // Método para obtener los mensajes de los usuarios seguidos
  async getFollowedMessages(headers: any) {

    const followedUsers = await axios.get('http://localhost:3003/follow/followed', { headers });

    const followedUserIds = followedUsers.data.map((follow: any) => follow.user_id_s);

    return this.messageRepository.find({
      where: { user_id: In(followedUserIds) },
      order: { created_at: 'DESC' },
    });
  }
}
