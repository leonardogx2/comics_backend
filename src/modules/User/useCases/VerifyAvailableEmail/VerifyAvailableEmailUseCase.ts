import { IUserRepository } from "../../infra/types/IUserRepository";

export class VerifyAvailableEmailUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string) {
    console.log({ email });
    let available = false;
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) available = true;
    return { available };
  }
}
