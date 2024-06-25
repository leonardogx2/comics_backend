import { databaseRepositories } from "@/database";
import { CreateRefreshTokenUseCase } from "./CreateRefreshTokenUseCase";

export function makeCreateRefreshTokenUseCase() {
  const refreshTokenRepository =
    new databaseRepositories.RefreshTokenRepository();
  const useCase = new CreateRefreshTokenUseCase(refreshTokenRepository);
  return useCase;
}
