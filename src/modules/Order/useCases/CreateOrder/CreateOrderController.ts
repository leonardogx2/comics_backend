import { Request, Response } from "express";
import { makeCreateOrderUseCase } from ".";
import { CreateOrderControllerDTO } from "../../dtos/CreateOrderDTO";

export class CreateOrderController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id;
    const {
      method,
      cpf,
      name,
      cardCode,
      expirationDate,
      cvv,
      plots,
      state,
      cep,
      city,
      neighborhood,
      streetName,
      streetNumber,
    } = req.body;

    const data = {
      userId,
      method,
      cpf,
      name,
      cardCode,
      expirationDate,
      cvv,
      plots,
      state,
      cep,
      city,
      neighborhood,
      streetName,
      streetNumber,
    } as CreateOrderControllerDTO;

    const createOrderUseCase = makeCreateOrderUseCase();

    const order = await createOrderUseCase.execute(data);
    return res.json(order);
  }
}
