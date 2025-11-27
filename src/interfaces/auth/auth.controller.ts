import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../../application/user/dto/login.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // Autentica credenciales y devuelve JWT + datos seguros del usuario
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
