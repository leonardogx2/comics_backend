import { Request, Response } from "express";
import { makeValidateRefreshTokenUseCase } from ".";

export class ValidateRefreshTokenController {
  async handle(req: Request, res: Response) {
    const { refreshTokenId } = req.body;

    console.log({ refreshTokenId });

    const validateRefreshTokenUseCase = makeValidateRefreshTokenUseCase();

    const { refreshToken, accessToken } =
      await validateRefreshTokenUseCase.execute(refreshTokenId);

    return res.json({ refreshToken, accessToken });
  }
}
