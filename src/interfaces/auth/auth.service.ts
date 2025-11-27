import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/user/user.repository';
import { LoginDto } from '../../application/user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository') private readonly users: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    // Verifica credenciales contra el repositorio y compara hash
    const user = await this.users.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    return user;
  }

  async login(input: LoginDto) {
    // Genera JWT y devuelve datos seguros del usuario autenticado
    const user = await this.validateUser(input.email, input.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwt.signAsync(payload);
    return { token, user: user.toSafe() };
  }
}
