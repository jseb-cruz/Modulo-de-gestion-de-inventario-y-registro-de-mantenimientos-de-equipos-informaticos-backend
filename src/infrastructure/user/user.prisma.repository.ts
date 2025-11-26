import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { User } from '../../domain/user/user.entity';
import { UserRepository, CreateUserData, UpdateUserData } from '../../domain/user/user.repository';

function toEntity(row: any): User {
  return new User({
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    status: row.status,
    password: row.password,
    metadata: row.metadata as any,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  });
}

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const rows = await this.prisma.user.findMany();
    return rows.map(toEntity);
  }

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? toEntity(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    return row ? toEntity(row) : null;
  }

  async create(input: CreateUserData): Promise<User> {
    const row = await this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        role: input.role,
        status: input.status,
        password: input.password,
        metadata: input.metadata as any,
      },
    });
    return toEntity(row);
  }

  async update(id: string, input: UpdateUserData): Promise<User> {
    const row = await this.prisma.user.update({
      where: { id },
      data: {
        email: input.email,
        name: input.name,
        role: input.role,
        status: input.status,
        password: input.password,
        metadata: input.metadata as any,
      },
    });
    return toEntity(row);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
