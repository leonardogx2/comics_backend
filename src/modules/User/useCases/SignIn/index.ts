import { databaseRepositories } from "@/database";
import { SignInUseCase } from "./SignInUseCase";
import { SignInController } from "./SignInController";

export function makeSignInUseCase() {
  const userRepository = new databaseRepositories.UserRepository();
  const useCase = new SignInUseCase(userRepository);
  return useCase;
}

export const signInController = new SignInController();
