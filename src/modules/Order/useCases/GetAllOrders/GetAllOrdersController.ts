import { makeGetAllBooksUseCase } from "@/modules/Book/useCases/GetAllBooks";
import { Request, Response } from "express";
import { makeGetAllOrdersUseCase } from ".";

export class GetAllOrdersController {
  async handle(req: Request, res: Response) {
    const pagination = req.pagination;
    const filters = { ...req.query, ...pagination };

    const getAllOrdersUseCase = makeGetAllOrdersUseCase();
    const ordersAndTotal = await getAllOrdersUseCase.execute(filters);
    return res.json(ordersAndTotal);
  }
}
