import { User, UserProps } from './user.entity';

export type CreateUserData = Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserData = Partial<Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>>;

export abstract class UserRepository {
  // Lista todos los usuarios
  abstract findAll(): Promise<User[]>;
  // Busca un usuario por id
  abstract findById(id: string): Promise<User | null>;
  // Busca un usuario por email
  abstract findByEmail(email: string): Promise<User | null>;
  // Crea un usuario con los datos proporcionados
  abstract create(input: CreateUserData): Promise<User>;
  // Actualiza campos de un usuario
  abstract update(id: string, input: UpdateUserData): Promise<User>;
  // Elimina un usuario
  abstract remove(id: string): Promise<void>;
}
