import { databaseRepositories } from "@/database";
import { RegisterUserUseCase } from "./RegisterUserUseCase";
import { RegisterUserController } from "./RegisterUserController";

export function makeRegisterUserUseCase() {
  const userRepository = new databaseRepositories.UserRepository();
  const useCase = new RegisterUserUseCase(userRepository);
  return useCase;
}

export const registerUserControler = new RegisterUserController();
