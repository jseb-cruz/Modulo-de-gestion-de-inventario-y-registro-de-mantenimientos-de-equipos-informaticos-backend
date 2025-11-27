import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Respuesta simple para prueba de vida
  getHello(): string {
    return 'Hello World!';
  }
}
