import { Request, Response } from "express";
import { makeFindBookByIdUseCase } from ".";

export class FindBookByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const findBookByIdUseCase = makeFindBookByIdUseCase();

    const book = await findBookByIdUseCase.execute(id);
    return res.json(book);
  }
}
