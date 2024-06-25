import { CreateBookDTO } from "../../dtos/CreateBookDTO";
import { GetAllBooksDTO } from "../../dtos/GetAllBooksDTO";
import { UpdateBookDTO } from "../../dtos/UpdateBookDTO";
import { Book } from "../../entity/Book";

export interface IBookRepository {
  create(data: CreateBookDTO): Promise<Book>;
  update(data: UpdateBookDTO): Promise<Book>;
  findById(bookId: string): Promise<Book | undefined>;
  findByTitle(name: string): Promise<Book | undefined>;
  getAll(filters: GetAllBooksDTO): Promise<{ books: Book[]; total: number, totalCartInBRL?: number }>;
}
