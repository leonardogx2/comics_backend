import { databaseRepositories } from "@/database";
import { DelBookInCartUseCase } from "./DelBookInCartUseCase";
import { DelBookInCartController } from "./DelBookInCartController";

export function makeDelBookInCartUseCase() {
  const cartRepository = new databaseRepositories.CartRepository();
  const useCase = new DelBookInCartUseCase(cartRepository);
  return useCase;
}

export const delBookInCartController = new DelBookInCartController();
