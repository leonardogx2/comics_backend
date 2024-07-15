import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../../dtos/UpdateUserDTO";
import { User } from "../../entity/User";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  update(data: UpdateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  cleanCart(userId: string): Promise<void>;
  getAll(): Promise<{ users: User[]; total: number }>;
}
