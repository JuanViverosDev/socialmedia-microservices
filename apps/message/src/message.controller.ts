// src/message.controller.ts
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from '../../auth/src/guards/jwt-auth.guard';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    createMessage(@Body() createMessageDto: CreateMessageDto, @Request() req) {
        return this.messageService.createMessage(req.user.userId, createMessageDto.content);
    }

    @Get('followed')
    getFollowedMessages(@Request() req) {
        return this.messageService.getFollowedMessages(req.headers);
    }
}
