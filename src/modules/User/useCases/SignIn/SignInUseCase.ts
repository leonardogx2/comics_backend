import { AppError } from "@/shared/errors/AppError";
import { IUserRepository } from "../../infra/types/IUserRepository";
import { sign } from "jsonwebtoken";
import { SignInDTO } from "../../dtos/SignInDTO";
import { compare } from "@/shared/lib/bcrypt";
import { makeCreateRefreshTokenUseCase } from "@/modules/RefreshToken/useCases/CreateRefreshToken";

export class SignInUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password, keepSession }: SignInDTO) {
    const isUserExists = await this.userRepository.findByEmail(email);
    if (!isUserExists) throw new AppError("Usuário inválido.");

    const isCorrectPassword = compare(password, isUserExists.hash);
    if (!isCorrectPassword) throw new AppError("Usuário inválido.");

    const createRefreshTokenUseCase = makeCreateRefreshTokenUseCase();
    const { accessToken, refreshToken } =
      await createRefreshTokenUseCase.execute({
        userId: isUserExists.id,
        keepSession: keepSession || false,
      });

    isUserExists.hash = "";

    return { user: isUserExists, accessToken, refreshToken };
  }
}
