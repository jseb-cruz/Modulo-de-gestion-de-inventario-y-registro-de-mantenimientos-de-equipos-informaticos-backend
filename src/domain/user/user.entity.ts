export type UserRole = 'Admin' | 'User';
export type UserStatus = 'Active' | 'Inactive';

export interface UserProps {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  password: string; // hashed
  metadata?: Record<string, unknown> | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  constructor(private readonly props: UserProps) {}

  get id() { return this.props.id; }
  get email() { return this.props.email; }
  get name() { return this.props.name; }
  get role() { return this.props.role; }
  get status() { return this.props.status; }
  get password() { return this.props.password; }
  get metadata() { return this.props.metadata; }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }

  // Indica si el usuario está activo
  isActive(): boolean {
    return this.props.status === 'Active';
  }

  // Devuelve la representación segura sin contraseña
  toSafe() {
    const { password, ...rest } = this.props;
    return rest;
  }
}
