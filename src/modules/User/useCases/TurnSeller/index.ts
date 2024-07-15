import { databaseRepositories } from "@/database";
import { TurnSellerUseCase } from "./TurnSellerUseCase";
import { TurnSellerController } from "./TurnSellerController";

export function makeTurnSellerUseCase() {
  const userRepository = new databaseRepositories.UserRepository();
  const useCase = new TurnSellerUseCase(userRepository);
  return useCase;
}

export const turnSellerController = new TurnSellerController();
