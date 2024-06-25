import { RefreshToken } from "../../entity/RefreshToken";

export interface IRefreshTokenRepository {
  create(refreshTokenData: RefreshToken): Promise<RefreshToken>;
  findById(refreshTokenId: string): Promise<RefreshToken>;
  findByOldRefreshTokenId(oldRefreshTokenId: string): Promise<RefreshToken>;
  findByUserId(userId: string): Promise<RefreshToken>;
  delete(refreshTokenId: string): Promise<void>;
}
