import { Request, Response } from "express";
import { makeVerifyAvailableEmailUseCase } from ".";

export class VerifyAvailableEmailController {
  async handle(req: Request, res: Response) {
    const { email } = req.query;

    const verifyAvailableEmailUseCase = makeVerifyAvailableEmailUseCase();
    const output = await verifyAvailableEmailUseCase.execute(email as string);
    return res.json(output);
  }
}
