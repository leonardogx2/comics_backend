import { Request, Response } from "express";
import { makeRegisterUserUseCase } from ".";

export class RegisterUserController {
  async handle(req: Request, res: Response) {
    console.log(req.body);
    const { name, email, isSeller, password } = req.body;

    const registerUserUseCase = makeRegisterUserUseCase();
    const user = await registerUserUseCase.execute({
      name,
      email,
      isSeller,
      password,
    });
    return res.json(user);
  }
}
