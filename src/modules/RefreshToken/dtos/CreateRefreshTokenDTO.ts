export interface CreateRefreshTokenDTO {
  userId: string;
  expiresIn?: number;
  keepSession?: boolean;
}
