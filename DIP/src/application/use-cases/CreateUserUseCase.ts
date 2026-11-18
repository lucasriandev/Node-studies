import { User } from "../../domain/User.js";
import { UserRepositoryPort } from "../../domain/UserRepositoryPort.js";
import crypto from "crypto"; // Usando o gerador nativo do Node

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(name: string, email: string): Promise<User> {
    // 1. Regra de negócio: O email já está em uso?
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Já existe um usuário cadastrado com este email.");
    }

    // 2. Criar a entidade de Domínio
    const newUser = new User(crypto.randomUUID(), name, email);

    // 3. Salvar usando a Porta (não sabemos onde ou como isso é salvo)
    await this.userRepository.save(newUser);

    return newUser;
  }
}
