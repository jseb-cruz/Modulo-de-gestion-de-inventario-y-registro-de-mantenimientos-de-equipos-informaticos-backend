import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('UserRepository') private readonly users: UserRepository) {}

  async findAll() {
    const list = await this.users.findAll();
    return list.map(u => u.toSafe());
  }

  async findOne(id: string) {
    const user = await this.users.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user.toSafe();
  }

  async create(input: CreateUserDto) {
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
    await this.users.remove(id);
  }
}
