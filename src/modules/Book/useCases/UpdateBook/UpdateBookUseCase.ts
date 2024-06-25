import { CreateFileDTO } from "@/modules/File/dtos/CreateFileDTO";
import { UpdateBookDTO } from "../../dtos/UpdateBookDTO";
import { IBookRepository } from "../../infra/types/IBookRepository";
import { IFileRepository } from "@/modules/File/infra/types/IFileRepository";
import { validateSchemaOrThrowAppError } from "@/shared/utils/validateSchemaOrThrowAppError";
import { UpdateBookSchema } from "../../entity/validator/UpdateBookSchema";
import { AppError } from "@/shared/errors/AppError";
import { Image } from "@/modules/Image/entity/Image";

export class UpdateBookUseCase {
  constructor(
    private bookRepository: IBookRepository,
    private fileRepository: IFileRepository
  ) {}

  async execute(bookData: UpdateBookDTO, fileData?: CreateFileDTO) {
    validateSchemaOrThrowAppError(UpdateBookSchema, bookData);

    const bookExists = await this.bookRepository.findById(bookData.id);
    if (!bookExists) throw new AppError("Quadrinho não encontrado");

    if (fileData) {
      await this.deleteCurrentImage(bookExists.Image!);
      bookData.image = await this.fileRepository.create(fileData);
    }

    const updatedBook = await this.bookRepository.update(bookData);
    return updatedBook;
  }

  async deleteCurrentImage(Image: Image): Promise<void> {
    if (!Image.url) {
      try {
        await this.fileRepository.delete(Image.name);
      } catch (err) {
        console.log("Erro ao deletar arquivo");
      }
    }
  }
}
