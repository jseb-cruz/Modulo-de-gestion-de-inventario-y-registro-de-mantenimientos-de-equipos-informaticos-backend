import { User, UserProps } from './user.entity';

export type CreateUserData = Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserData = Partial<Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>>;

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(input: CreateUserData): Promise<User>;
  abstract update(id: string, input: UpdateUserData): Promise<User>;
  abstract remove(id: string): Promise<void>;
}
