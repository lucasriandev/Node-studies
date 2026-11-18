import type { User } from './User.js';

// PORTA: o contrato.
// O Adaptador (Prisma) é obrigado a implementar esses métodos.
export interface UserRepositoryPort {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
