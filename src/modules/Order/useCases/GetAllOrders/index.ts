import { databaseRepositories } from "@/database";
import { GetAllOrdersUseCase } from "./GetAllOrdersUseCase";
import { GetAllOrdersController } from "./GetAllOrdersController";

export function makeGetAllOrdersUseCase() {
  const orderRepository = new databaseRepositories.OrderRepository();
  const useCase = new GetAllOrdersUseCase(orderRepository);
  return useCase;
}

export const getAllOrdersController = new GetAllOrdersController();
