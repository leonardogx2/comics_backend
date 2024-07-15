import { AppError } from "@/shared/errors/AppError";
import { IUserRepository } from "../../infra/types/IUserRepository";

export class TurnSellerUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string) {
    const userExists = await this.userRepository.findById(userId);
    if (!userExists) throw new AppError("Usuário não encontrado.");

    if (userExists.isSeller) throw new AppError("Você já é um vendedor.");

    await this.userRepository.update({ id: userId, isSeller: true });
  }
}
