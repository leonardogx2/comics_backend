import { Request, Response } from "express";
import { makeUpdateBookUseCase } from ".";

export class UpdateBookController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const bookData = JSON.parse(req.body.book);
    const fileData = req.file;

    const updateBookUseCase = makeUpdateBookUseCase();
    const updatedBook = await updateBookUseCase.execute(
      { ...bookData, id },
      fileData
    );

    return res.json(updatedBook);
  }
}
