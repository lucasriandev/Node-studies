import type { Request, Response } from "express";
import { ListUsersUseCase } from "../../application/use-cases/ListUsersUseCase.js";

export class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(_req: Request, res: Response): Promise<void> {
    try {
      const users = await this.listUsersUseCase.execute();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
