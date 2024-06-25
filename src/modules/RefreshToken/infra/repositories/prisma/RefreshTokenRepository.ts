import prisma from "../../../../../../prisma";
import { RefreshToken } from "../../../entity/RefreshToken";
import { IRefreshTokenRepository } from "../../types/IRefreshTokenRepository";

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  async create(refreshTokenData: RefreshToken): Promise<RefreshToken> {
    const refreshToken = (await prisma.refreshToken.create({
      data: refreshTokenData,
    })) as RefreshToken;
    return refreshToken;
  }

  async findById(refreshTokenId: string): Promise<RefreshToken> {
    const refreshToken = (await prisma.refreshToken.findUnique({
      where: { id: refreshTokenId },
    })) as RefreshToken;
    return refreshToken;
  }

  async findByOldRefreshTokenId(
    oldRefreshTokenId: string
  ): Promise<RefreshToken> {
    const refreshToken = (await prisma.refreshToken.findFirst({
      where: { oldRefreshTokenId },
    })) as RefreshToken;
    return refreshToken;
  }

  async findByUserId(userId: string): Promise<RefreshToken> {
    const refreshToken = (await prisma.refreshToken.findFirst({
      where: { userId },
    })) as RefreshToken;
    return refreshToken;
  }

  async delete(refreshTokenId: string): Promise<void> {
    await prisma.refreshToken.delete({ where: { id: refreshTokenId } });
  }
}
