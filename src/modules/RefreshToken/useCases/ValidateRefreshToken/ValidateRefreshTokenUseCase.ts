import { AppError } from "@/shared/errors/AppError";
import dayjs from "dayjs";
import { IRefreshTokenRepository } from "../../infra/types/IRefreshTokenRepository";
import { makeCreateRefreshTokenUseCase } from "../CreateRefreshToken";

export class ValidateRefreshTokenUseCase {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute(refreshTokenId: string) {
    const isRefreshTokenOld =
      await this.refreshTokenRepository.findByOldRefreshTokenId(refreshTokenId);

    if (isRefreshTokenOld) {
      await this.refreshTokenRepository.delete(isRefreshTokenOld.id);
      throw new AppError("Refresh Token inválido.", 403);
    }

    const receivedRefreshToken = await this.refreshTokenRepository.findById(
      refreshTokenId
    );
    if (!receivedRefreshToken)
      throw new AppError("Refresh Token inválido.", 403);

    if (dayjs().isAfter(dayjs.unix(receivedRefreshToken.expiresIn))) {
      await this.refreshTokenRepository.delete(receivedRefreshToken.id);
      throw new AppError("Refresh Token inválido.", 403);
    }

    const createRefreshTokenUseCase = makeCreateRefreshTokenUseCase();
    const { accessToken, refreshToken } =
      await createRefreshTokenUseCase.execute({
        userId: receivedRefreshToken.userId,
      });

    return { accessToken, refreshToken };
  }
}
