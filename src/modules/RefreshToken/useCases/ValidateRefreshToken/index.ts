import { databaseRepositories } from "@/database";
import { ValidateRefreshTokenUseCase } from "./ValidateRefreshTokenUseCase";
import { ValidateRefreshTokenController } from "./ValidateRefreshTokenController";

export function makeValidateRefreshTokenUseCase() {
  const refreshTokenRepository =
    new databaseRepositories.RefreshTokenRepository();
  const useCase = new ValidateRefreshTokenUseCase(refreshTokenRepository);
  return useCase;
}

export const validateRefreshTokenController =
  new ValidateRefreshTokenController();
