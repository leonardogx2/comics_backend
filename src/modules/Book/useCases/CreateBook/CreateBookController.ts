import { Request, Response } from "express";
import { makeCreateBookUseCase } from ".";

export class CreateBookController {
  async handle(req: Request, res: Response) {
    const ownerId = req.user.id;
    const bookData = { ...JSON.parse(req.body.book), ownerId };
    const fileData = req.file;

    const createBookUseCase = makeCreateBookUseCase();

    const book = await createBookUseCase.execute(bookData, fileData);
    return res.json(book);
  }
}
