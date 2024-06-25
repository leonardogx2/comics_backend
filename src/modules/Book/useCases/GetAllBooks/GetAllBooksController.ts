import { Request, Response } from "express";
import { makeGetAllBooksUseCase } from ".";
import { GetAllBooksDTO } from "../../dtos/GetAllBooksDTO";

export class GetAllBooksController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id;
    const filters = { ...req.query, userId } as GetAllBooksDTO;
    filters.inOffer =
      req.query.inOffer === "true"
        ? true
        : req.query.inOffer === "false"
        ? false
        : undefined;
    filters.inStock =
      req.query.inStock === "true"
        ? true
        : req.query.inStock === "false"
        ? false
        : undefined;
    filters.deleted =
      req.query.deleted === "true"
        ? true
        : req.query.deleted === "false"
        ? false
        : undefined;

    const getAllBooksUseCase = makeGetAllBooksUseCase();

    const booksAndTotal = await getAllBooksUseCase.execute({
      ...filters,
      ...req.pagination,
    });

    return res.json(booksAndTotal);
  }
}
