import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('UserRepository') private readonly users: UserRepository) {}

  async findAll() {
    // Devuelve todos los usuarios en formato seguro (sin password)
    const list = await this.users.findAll();
    return list.map(u => u.toSafe());
  }

  async findOne(id: string) {
    // Busca un usuario por id o lanza 404
    const user = await this.users.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user.toSafe();
  }

  async create(input: CreateUserDto) {
    // Registra un usuario nuevo con hash de contraseña y evita duplicados
    const exists = await this.users.findByEmail(input.email);
    if (exists) throw new ConflictException('Email already registered');
    const hashed = await bcrypt.hash(input.password, 10);
    const user = await this.users.create({
      email: input.email,
      name: input.name,
      role: input.role,
      status: input.status,
      password: hashed,
      metadata: input.metadata,
    });
    return user.toSafe();
  }

  async update(id: string, input: UpdateUserDto) {
    // Actualiza datos parciales, re-hasheando si se envía nueva contraseña
    const user = await this.users.findById(id);
    if (!user) throw new NotFoundException('User not found');
    const data: any = { ...input };
    if (input.password) {
      data.password = await bcrypt.hash(input.password, 10);
    }
    const updated = await this.users.update(id, data);
    return updated.toSafe();
  }

  async remove(id: string) {
    // Elimina un usuario existente
    await this.users.remove(id);
  }
}
