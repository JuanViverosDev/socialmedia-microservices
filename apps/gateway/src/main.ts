// src/main.ts
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
    const app = await NestFactory.create(GatewayModule);
    await app.listen(3004);
    console.log('Gateway running on http://localhost:3000');
}
bootstrap();
