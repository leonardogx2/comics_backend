import crypto from "crypto";

interface IRefreshToken {
  id?: string;
  expiresIn: number;
  userId: string;
  keepSession?: boolean;
  oldRefreshTokenId?: string;
}

export class RefreshToken {
  id: string;
  expiresIn: number;
  userId: string;
  oldRefreshTokenId?: string;
  keepSession: boolean;

  constructor(props: IRefreshToken) {
    if (!props.id) props.id = crypto.randomUUID();

    Object.assign(this, props);
  }
}
