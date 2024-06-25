export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  isSeller: boolean;
  hash: string;
}

export interface CreateUserControllerDTO {
  name: string;
  email: string;
  isSeller: boolean;
  password: string;
}
