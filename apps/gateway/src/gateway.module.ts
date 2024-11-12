// src/gateway.module.ts
import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
    controllers: [GatewayController],
    providers: [GatewayService],
})
export class GatewayModule {}
