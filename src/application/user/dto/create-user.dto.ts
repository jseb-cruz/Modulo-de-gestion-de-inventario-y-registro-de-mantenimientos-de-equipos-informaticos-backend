import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole, UserStatus } from '../../../domain/user/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(['Admin', 'User'])
  role: UserRole;

  @IsIn(['Active', 'Inactive'])
  status: UserStatus;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  metadata?: Record<string, unknown>;
}
