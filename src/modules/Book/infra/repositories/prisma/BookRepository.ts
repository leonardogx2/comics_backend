import { CreateBookDTO } from "@/modules/Book/dtos/CreateBookDTO";
import { Book } from "@/modules/Book/entity/Book";
import { IBookRepository } from "../../types/IBookRepository";
import prisma from "../../../../../../prisma";
import { GetAllBooksDTO } from "@/modules/Book/dtos/GetAllBooksDTO";
import { convertPagination } from "@/shared/utils/convertPagination";
import { Prisma } from "@prisma/client";
import { UpdateBookDTO } from "@/modules/Book/dtos/UpdateBookDTO";

export class PrismaBookRepository implements IBookRepository {
  async create(bookData: CreateBookDTO): Promise<Book> {
    const book = await prisma.book.create({
      data: {
        title: bookData.title,
        priceInBRL: bookData.priceInBRL,
        offerInBRL: bookData.offerInBRL,
        description: bookData.description,
        writerName: bookData.writerName,
        pencillerName: bookData.pencillerName,
        coverArtistName: bookData.coverArtistName,
        releaseYear: bookData.releaseYear,
        Image: {
          create: {
            name: bookData.image.name,
            url: bookData.image.url,
            local: bookData.image.url ? false : true,
          },
        },
        Owner: { connect: { id: bookData.ownerId } },
        stock: bookData.stock,
        category: bookData.category,
      },
    });
    return book;
  }

  async update(bookData: UpdateBookDTO): Promise<Book> {
    const updatedBook = await prisma.book.update({
      where: { id: bookData.id },
      data: {
        Image: bookData.image
          ? { create: { name: bookData.image.name } }
          : undefined,
        title: bookData.title !== undefined ? bookData.title : undefined,
        stock: bookData.stock !== undefined ? bookData.stock : undefined,
        priceInBRL:
          bookData.priceInBRL !== undefined ? bookData.priceInBRL : undefined,
        description: bookData.description ? bookData.description : undefined,
        writerName: bookData.writerName ? bookData.writerName : undefined,
        pencillerName: bookData.pencillerName
          ? bookData.pencillerName
          : undefined,
        coverArtistName: bookData.coverArtistName
          ? bookData.coverArtistName
          : undefined,
        releaseYear: bookData.releaseYear ? bookData.releaseYear : undefined,
        category: bookData.category ? bookData.category : undefined,
      },
    });

    return updatedBook;
  }

  async findById(bookId: string): Promise<Book | undefined> {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: { Image: true },
    });
    return book !== null ? book : undefined;
  }

  async findByTitle(title: string): Promise<Book | undefined> {
    const book = await prisma.book.findFirst({
      where: {
        title,
      },
    });

    return book !== null ? book : undefined;
  }

  async getAll(
    filters: GetAllBooksDTO
  ): Promise<{ books: Book[]; total: number; totalCartInBRL?: number }> {
    const {
      id,
      page,
      size,
      title,
      category,
      inOffer,
      ownerId,
      exactlyTitle,
      inCart,
      author,
      userId,
      startPrice,
      endPrice,
      releaseYear,
      orderBy,
      inStock,
      deleted,
    } = filters;

    const pagination = convertPagination({ page, size });

    const where: Prisma.BookWhereInput = {};
    const include: Prisma.BookInclude = {
      Image: true,
    };

    if (id) where.id = id;
    if (releaseYear) where.releaseYear = parseInt(releaseYear + "");
    if (author)
      where.OR = [
        { writerName: { contains: author, mode: "insensitive" } },
        { pencillerName: { contains: author, mode: "insensitive" } },
        { coverArtistName: { contains: author, mode: "insensitive" } },
      ];
    if (startPrice || endPrice)
      where.priceInBRL = {
        gte: startPrice && parseInt(startPrice + ""),
        lte: endPrice && parseInt(endPrice + ""),
      };
    if (ownerId) where.ownerId = ownerId;
    if (exactlyTitle) where.title = exactlyTitle;
    if (title) where.title = { contains: title, mode: "insensitive" };
    if (category) where.category = category;
    if (inOffer) where.offerInBRL = { gt: 0 };
    if (inCart) {
      where.Carts = { some: { userId } };
    }
    if (deleted !== undefined) {
      where.deleted = deleted;
    }
    if (inStock !== undefined || inCart) {
      if (inStock || inCart) {
        where.stock = { gt: 0 };
      } else {
        where.stock = 0;
      }
    }

    const books = (await prisma.book.findMany({
      where,
      include,
      orderBy:
        orderBy === "mostSelled"
          ? { Orders: { _count: "desc" } }
          : orderBy === "za"
          ? { title: "desc" }
          : orderBy === "bigPrice"
          ? { priceInBRL: "desc" }
          : orderBy === "lowPrice"
          ? { priceInBRL: "asc" }
          : { title: "asc" },
      ...pagination,
    })) as Book[];
    const total = await prisma.book.count({ where });
    const totalCartInBRL = inCart
      ? (
          await prisma.book.findMany({
            where: { Carts: { some: { userId } } },
            select: { priceInBRL: true, offerInBRL: true },
          })
        ).reduce((prevValue, currentValue) => {
          const price = currentValue.offerInBRL || currentValue.priceInBRL || 0;
          return prevValue + price;
        }, 0)
      : undefined;

    return { books, total, totalCartInBRL };
  }
}
