import type { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase.js";

export class CreateUserController {
  // Injetamos o Caso de Uso aqui!
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;

      // O controller não tem regra de negócio, ele só repassa a chamada
      const user = await this.createUserUseCase.execute(name, email);

      res.status(201).json(user);
    } catch (error: any) {
      // Se a regra de negócio do email duplicado falhar, cai aqui
      res.status(400).json({ error: error.message });
    }
  }
}
