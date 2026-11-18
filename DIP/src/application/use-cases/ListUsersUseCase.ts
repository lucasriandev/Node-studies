import type { User } from "../../domain/User.js";
import type { UserRepositoryPort } from "../../domain/UserRepositoryPort.js";

export class ListUsersUseCase {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
