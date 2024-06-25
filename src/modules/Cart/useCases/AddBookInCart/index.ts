import { databaseRepositories } from "@/database";
import { AddBookInCartUseCase } from "./AddBookInCartUseCase";
import { AddBookInCartController } from "./AddBookInCartController";

export function makeAddBookInCartUseCase() {
  const cartRepository = new databaseRepositories.CartRepository();
  const useCase = new AddBookInCartUseCase(cartRepository);
  return useCase;
}

export const addBookInCartController = new AddBookInCartController();
