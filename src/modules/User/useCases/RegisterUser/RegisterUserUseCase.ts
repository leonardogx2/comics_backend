import { defaultHash } from "@/shared/lib/bcrypt";
import {
  CreateUserControllerDTO,
  CreateUserDTO,
} from "../../dtos/CreateUserDTO";
import { IUserRepository } from "../../infra/types/IUserRepository";

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserControllerDTO) {
    const splittedName = data.name.split(" ");
    const firstName = splittedName[0].trim();
    const lastName = splittedName.join(" ").replace(firstName, "").trim();

    const userData: CreateUserDTO = {
      hash: defaultHash(data.password),
      email: data.email,
      isSeller: data.isSeller || false,
      firstName,
      lastName,
    };

    const user = await this.userRepository.create(userData);

    user.hash = "";
    return user;
  }
}
