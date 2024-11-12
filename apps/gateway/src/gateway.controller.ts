// src/gateway.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('api')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  // Redirigir la solicitud de login al servicio de autenticación
  @Post('auth/login')
  login(@Body() body: any) {
    return this.gatewayService.proxyRequest('auth', 'login', body);
  }

  // Crear un usuario - Redirige al servicio de autenticación
  @Post('auth/users')
  createUser(@Body() body: any, @Req() req: any) {
    return this.gatewayService.proxyRequest(
      'auth',
      'users',
      body,
      req.headers,
      'POST',
    );
  }

  // Obtener todos los usuarios - Redirige al servicio de autenticación
  @Get('auth/users')
  getAllUsers(@Req() req: any) {
    return this.gatewayService.proxyRequest(
      'auth',
      'users',
      {},
      req.headers,
      'GET',
    );
  }

  // Actualizar un usuario específico
  @Patch('auth/users/:id')
  updateUser(@Param('id') id: number, @Body() body: any, @Req() req: any) {
    return this.gatewayService.proxyRequest(
      'auth',
      `users/${id}`,
      body,
      req.headers,
      'PATCH',
    );
  }

  // Eliminar un usuario específico
  @Delete('auth/users/:id')
  deleteUser(@Param('id') id: number, @Req() req: any) {
    return this.gatewayService.proxyRequest(
      'auth',
      `users/${id}`,
      {},
      req.headers,
      'DELETE',
    );
  }

  // Obtener el perfil del usuario autenticado
  @Get('auth/profile')
  getProfile(@Req() req: any) {
    return this.gatewayService.proxyRequest(
      'auth',
      'profile',
      {},
      req.headers,
      'GET',
    );
  }

  // Seguir a un usuario - Redirige al servicio de seguimiento
  @Post('follow')
  followUser(@Body() body: any, @Req() req: any) {
    return this.gatewayService.proxyRequest(
      'follow',
      '',
      body,
      req.headers,
      'POST',
    );
  }

  // Dejar de seguir a un usuario - Redirige al servicio de seguimiento
  @Delete('follow')
  unfollowUser(@Body() body: any, @Req() req: any) {
    return this.gatewayService.proxyRequest(
      'follow',
      '',
      body,
      req.headers,
      'DELETE',
    );
  }

  // Obtener la lista de usuarios seguidos - Redirige al servicio de seguimiento
  @Get('follow/followed')
  getFollowedUsers(@Req() req: any) {
    return this.gatewayService.proxyRequest(
      'follow',
      'followed',
      {},
      req.headers,
      'GET',
    );
  }

  // Crear un mensaje - Redirige al servicio de mensajes
  @Post('messages')
  createMessage(@Body() body: any, @Req() req: any) {
    return this.gatewayService.proxyRequest(
      'messages',
      '',
      body,
      req.headers,
      'POST',
    );
  }

  // Obtener mensajes de usuarios seguidos - Redirige al servicio de mensajes
  @Get('messages/followed')
  getFollowedMessages(@Req() req: any) {
    return this.gatewayService.proxyRequest(
      'messages',
      'followed',
      {},
      req.headers,
      'GET',
    );
  }
}
