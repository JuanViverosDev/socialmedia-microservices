// src/main.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth.module';

async function bootstrap() {
    // Crea una instancia HTTP para el servicio
    const app = await NestFactory.create(AuthModule);

    // Configuración de Swagger para la documentación de la API HTTP
    const config = new DocumentBuilder()
        .setTitle('Follow Service')
        .setDescription('API for managing user follow relationships')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Configura el puerto en el que se ejecutará el servicio HTTP
    await app.listen(3001); // Cambia el puerto según el servicio
    console.log('Follow Service is running on http://localhost:3001/api');
}

bootstrap();
