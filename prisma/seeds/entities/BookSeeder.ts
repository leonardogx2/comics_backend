import { PrismaBookRepository } from "@/modules/Book/infra/repositories/prisma/BookRepository";
import { TakeMarvelComicsUseCase } from "@/modules/Book/useCases/TakeMarvelComics/TakeMarvelComicsUseCase";
import { PrismaClient } from "@prisma/client";

export class PrismaBookSeeder {
  constructor(prisma: PrismaClient) {}

  async run() {
    const takeMarvelComicsUseCase = new TakeMarvelComicsUseCase();

    const booksToCreate = await takeMarvelComicsUseCase.execute();
    const bookRepository = new PrismaBookRepository();

    for (let i = 0; i < booksToCreate.length; i++) {
      const bookToCreate = booksToCreate[i];
      await bookRepository.create(bookToCreate);
      console.log(`Quadrinho ${bookToCreate.title} criado com sucesso.`);
    }
  }
}
