import { CreateFileDTO } from "@/modules/File/dtos/CreateFileDTO";
import { CreateBookDTO } from "../../dtos/CreateBookDTO";
import { Book } from "../../entity/Book";
import { IBookRepository } from "../../infra/types/IBookRepository";
import { IFileRepository } from "@/modules/File/infra/types/IFileRepository";
import { validateSchemaOrThrowAppError } from "@/shared/utils/validateSchemaOrThrowAppError";
import { CreateBookSchema } from "../../entity/validator/CreateBookSchema";
import { AppError } from "@/shared/errors/AppError";

export class CreateBookUseCase {
  constructor(
    private bookRepository: IBookRepository,
    private fileRepository: IFileRepository
  ) {}

  async execute(
    bookData: Omit<CreateBookDTO, "image">,
    fileData: CreateFileDTO
  ): Promise<Book> {
    validateSchemaOrThrowAppError(CreateBookSchema, bookData);

    const bookAlreadyExists = (
      await this.bookRepository.getAll({
        exactlyTitle: bookData.title,
        ownerId: "any-id",
        page: 1,
        size: 1,
      })
    ).books[0];

    if (bookAlreadyExists)
      throw new AppError("Você já possui um livro com este nome");

    const image = await this.fileRepository.create(fileData);

    const book = await this.bookRepository.create({
      ...bookData,
      image,
    });
    return book;
  }
}
