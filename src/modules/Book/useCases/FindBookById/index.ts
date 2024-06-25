import { databaseRepositories } from "@/database";
import { FindBookByIdUseCase } from "./FindBookByIdUseCase";
import { FindBookByIdController } from "./FindBookByIdController";

export function makeFindBookByIdUseCase() {
  const bookRepository = new databaseRepositories.BookRepository();
  const useCase = new FindBookByIdUseCase(bookRepository);
  return useCase;
}

export const findBookByIdController = new FindBookByIdController();
