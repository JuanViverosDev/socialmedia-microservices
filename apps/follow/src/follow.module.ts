// src/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Follow } from './follow.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follow]), // Registra el repositorio de User en el módulo
    TypeOrmModule.forRoot({
      type: 'postgres', // O el tipo de base de datos que estás usando
      host: 'dpg-cspa4l3tq21c739qaelg-a.oregon-postgres.render.com',
      port: 5432,
      username: 'redsocial_1e4l_user',
      password: '41d3kWrJCs6MmzKSPpJWr5jZmh2nfUuO',
      database: 'redsocial_1e4l',
      synchronize: true,
      entities: [Follow],
      ssl: {
        rejectUnauthorized: false, // Si tienes un certificado no verificado o auto-firmado
      },
    }),
    JwtModule.register({
      secret: 'secretKey', // Usa una clave segura en producción
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [FollowController], // Solo un controlador consolidado
  providers: [FollowService, JwtStrategy], // Incluye AuthService y otros proveedores
  exports: [FollowService],
})
export class FollowModule {}
