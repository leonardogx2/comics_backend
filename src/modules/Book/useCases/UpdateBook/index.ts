import { databaseRepositories } from "@/database";
import { UpdateBookUseCase } from "./UpdateBookUseCase";
import { UpdateBookController } from "./UpdateBookController";

export function makeUpdateBookUseCase() {
  const bookRepository = new databaseRepositories.BookRepository();
  const fileRepository = new databaseRepositories.FileRepository();
  const useCase = new UpdateBookUseCase(bookRepository, fileRepository);
  return useCase;
}

export const updateBookController = new UpdateBookController();
