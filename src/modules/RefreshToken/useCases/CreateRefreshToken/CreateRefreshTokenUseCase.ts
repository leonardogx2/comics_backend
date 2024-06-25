import { IRefreshTokenRepository } from "../../infra/types/IRefreshTokenRepository";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/shared/utils/env";
import { CreateRefreshTokenDTO } from "../../dtos/CreateRefreshTokenDTO";
import { RefreshToken } from "../../entity/RefreshToken";
import { validateSchemaOrThrowAppError } from "@/shared/utils/validateSchemaOrThrowAppError";
import { CreateRefreshTokenSchema } from "../../entity/validator/CreateRefreshTokenSchema";

export class CreateRefreshTokenUseCase {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute(data: CreateRefreshTokenDTO) {
    validateSchemaOrThrowAppError(CreateRefreshTokenSchema, data);

    const refreshTokenAlreadyExists =
      await this.refreshTokenRepository.findByUserId(data.userId);

    if (refreshTokenAlreadyExists) {
      data.keepSession = refreshTokenAlreadyExists.keepSession;
      try {
        await this.refreshTokenRepository.delete(refreshTokenAlreadyExists.id);
      } catch (err) {
        console.log("Erro ao deletar refreshToken");
      }
    }

    const refreshToken = await this.refreshTokenRepository.create(
      new RefreshToken({
        oldRefreshTokenId: refreshTokenAlreadyExists
          ? refreshTokenAlreadyExists.id
          : undefined,
        expiresIn: dayjs()
          .add(data.keepSession ? 30 : 1, "day")
          .unix(),
        ...data,
      })
    );

    const accessToken = jwt.sign({ userId: data.userId }, JWT_SECRET, {
      expiresIn: "300s",
    });

    return { refreshToken, accessToken };
  }
}
