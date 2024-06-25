import { databaseRepositories } from "@/database"
import { CreateBookUseCase } from "./CreateBookUseCase"
import { CreateBookController } from "./CreateBookController"

export function makeCreateBookUseCase() {
  const bookRepository = new databaseRepositories.BookRepository()
  const fileRepository = new databaseRepositories.FileRepository()

  const useCase = new CreateBookUseCase(bookRepository, fileRepository)
  return useCase
}

export const createBookController = new CreateBookController()