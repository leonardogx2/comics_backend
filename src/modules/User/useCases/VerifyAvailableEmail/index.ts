import { databaseRepositories } from "@/database";
import { VerifyAvailableEmailUseCase } from "./VerifyAvailableEmailUseCase";
import { VerifyAvailableEmailController } from "./VerifyAvailableEmailController";

export function makeVerifyAvailableEmailUseCase() {
  const userRepository = new databaseRepositories.UserRepository();
  const useCase = new VerifyAvailableEmailUseCase(userRepository);
  return useCase;
}

export const verifyAvailableEmailController =
  new VerifyAvailableEmailController();
