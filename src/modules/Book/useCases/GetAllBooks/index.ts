import { databaseRepositories } from "@/database";
import { PrismaBookRepository } from "../../infra/repositories/prisma/BookRepository";
import { GetAllBooksUseCase } from "./GetAllBooksUseCase";
import { GetAllBooksController } from "./GetAllBooksController";

export function makeGetAllBooksUseCase() {
  const bookRepository = new databaseRepositories.BookRepository();
  const useCase = new GetAllBooksUseCase(bookRepository);
  return useCase;
}

export const getAllBooksController = new GetAllBooksController();
