import express from "express";
import { prisma } from "./infra/database/prisma.js";
import { PrismaUserRepository } from "./infra/repositories/PrismaUserRepository.js";
import { CreateUserUseCase } from "./application/use-cases/CreateUserUseCase.js";
import { CreateUserController } from "./presentation/controllers/CreateUserController.js";

const app = express();
app.use(express.json());

// 1. Instanciamos a ferramenta de banco
// (instância única importada de infra/database/prisma.ts)

// 2. Instanciamos o Adapter passando o Prisma (A Injeção de Dependência começa aqui)
const userRepository = new PrismaUserRepository(prisma);

// 3. Instanciamos a Regra de Negócio passando o Adapter (O DIP brilhando!)
const createUserUseCase = new CreateUserUseCase(userRepository);

// 4. Instanciamos o Controller passando a Regra de Negócio
const createUserController = new CreateUserController(createUserUseCase);

// 5. Conectamos no Express
app.post("/users", (req, res) => createUserController.handle(req, res));

app.listen(3000, () => {
  console.log(
    "Servidor rodando na porta 3000 aplicando Arquitetura Hexagonal!",
  );
});
