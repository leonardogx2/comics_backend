declare namespace Express {
  export interface Request {
    pagination: {
      page: number;
      size: number;
    };
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      buffer: Buffer;
      size: number;
    };
    user: {
      id: string;
      isSeller: boolean;
      isAdmin: boolean;
      email: string;
    };
  }
}
