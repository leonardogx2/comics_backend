import { Request, Response } from "express";
import { makeDelBookInCartUseCase } from ".";

export class DelBookInCartController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id;
    const bookId = req.params.id;

    const delBookInCartUseCase = makeDelBookInCartUseCase();
    await delBookInCartUseCase.execute({ userId, bookId });
    return res.status(204).end();
  }
}
