// src/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registra el repositorio de User en el módulo
    TypeOrmModule.forRoot({
      type: 'postgres', // O el tipo de base de datos que estás usando
      host: 'dpg-cspa4l3tq21c739qaelg-a.oregon-postgres.render.com',
      port: 5432,
      username: 'redsocial_1e4l_user',
      password: '41d3kWrJCs6MmzKSPpJWr5jZmh2nfUuO',
      database: 'redsocial_1e4l',
      synchronize: true,
      entities: [User],
      ssl: {
        rejectUnauthorized: false, // Si tienes un certificado no verificado o auto-firmado
      },
    }),
    JwtModule.register({
      secret: 'secretKey', // Usa una clave segura en producción
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController], // Solo un controlador consolidado
  providers: [AuthService, UsersRepository, JwtStrategy], // Incluye AuthService y otros proveedores
  exports: [AuthService],
})
export class AuthModule {}
