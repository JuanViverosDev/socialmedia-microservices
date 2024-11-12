// src/message.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './message.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cspa4l3tq21c739qaelg-a.oregon-postgres.render.com',
      port: 5432,
      username: 'redsocial_1e4l_user',
      password: '41d3kWrJCs6MmzKSPpJWr5jZmh2nfUuO',
      database: 'redsocial_1e4l',
      synchronize: true,
      entities: [Message],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [MessageController],
  providers: [MessageService, JwtStrategy],
  exports: [MessageService],
})
export class MessageModule {}
