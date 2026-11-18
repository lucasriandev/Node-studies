import { PrismaClient } from '@prisma/client';

// Instância única do Prisma, compartilhada pelos repositórios.
export const prisma = new PrismaClient();
