import { Request, Response } from "express";
import { makeGetDashboardUseCase } from ".";

export class GetDashboardController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id;

    const getDashboardUseCase = makeGetDashboardUseCase();
    const output = await getDashboardUseCase.execute(userId);
    return res.json(output);
  }
}
