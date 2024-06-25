import { GetAllBooksDTO } from "../../dtos/GetAllBooksDTO";
import { IBookRepository } from "../../infra/types/IBookRepository";

export class GetAllBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(filters: GetAllBooksDTO) {
    const booksAndTotal = await this.bookRepository.getAll(filters);
    return booksAndTotal;
  }
}
