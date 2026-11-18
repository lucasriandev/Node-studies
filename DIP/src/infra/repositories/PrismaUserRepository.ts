import type { PrismaClient } from "@prisma/client";
import { User } from "../../domain/User.js";
import type { UserRepositoryPort } from "../../domain/UserRepositoryPort.js";

// A classe "assina o contrato" (implements UserRepositoryPort)
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(private prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    // Traduzindo a entidade User para o Prisma
    await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => new User(u.id, u.name, u.email));
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!prismaUser) return null;

    // Traduzindo o resultado do Prisma de volta para a entidade pura
    return new User(prismaUser.id, prismaUser.name, prismaUser.email);
  }
}
