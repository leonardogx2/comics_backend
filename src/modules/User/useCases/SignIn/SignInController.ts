import { Request, Response } from "express";
import { makeSignInUseCase } from ".";

export class SignInController {
  async handle(req: Request, res: Response) {
    const { email, password, keepSession } = req.body;

    const signInUseCase = makeSignInUseCase();
    const output = await signInUseCase.execute({
      email,
      password,
      keepSession,
    });
    return res.json(output);
  }
}
