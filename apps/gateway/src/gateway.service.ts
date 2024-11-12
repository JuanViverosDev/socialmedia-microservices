// src/gateway.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GatewayService {
  private readonly services = {
    auth: 'http://localhost:3001/auth', // URL del servicio de autenticación
    messages: 'http://localhost:3002/messages', // URL del servicio de mensajes
    follow: 'http://localhost:3003/follow', // URL del servicio de seguimiento
  };

  async proxyRequest(
    serviceName: string,
    endpoint: string,
    data: any = {},
    headers: any = {},
    method: string = 'POST',
  ) {
    const url = `${this.services[serviceName]}/${endpoint}`;
    console.log(`Proxy request to ${url} with method ${method}`);
    console.log('Headers:', headers);

    try {
      if (method === 'GET') {
        const response = await axios.get(url, {
          headers: {
            authorization: headers.authorization,
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      }

      if (method === 'DELETE') {
        const response = await axios.delete(url, {
          headers: {
            authorization: headers.authorization,
            'Content-Type': 'application/json',
          },
          data,
        });
        return response.data;
      }

      if (method === 'PATCH') {
        const response = await axios.patch(url, data, {
          headers: {
            authorization: headers.authorization,
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      }

      if (method === 'POST') {
        const response = await axios.post(url, data, {
          headers: {
            authorization: headers.authorization,
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      }
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error en el microservicio',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
