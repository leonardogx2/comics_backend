import { Request, Response } from "express";
import { makeAddBookInCartUseCase } from ".";

export class AddBookInCartController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id;
    const bookId = req.params.id;

    const addBookInCartUseCase = makeAddBookInCartUseCase();
    await addBookInCartUseCase.execute({ userId, bookId });
    return res.status(204).end();
  }
}
