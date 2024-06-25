import { AppError } from "@/shared/errors/AppError";
import { IBookRepository } from "../../infra/types/IBookRepository";

export class FindBookByIdUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(bookId: string) {
    const book = await this.bookRepository.findById(bookId);
    if (!book) throw new AppError("Quadrinho não encontrado.", 404);

    return book;
  }
}
