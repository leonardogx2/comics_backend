import { databaseRepositories } from "@/database";
import { CreateOrderUseCase } from "./CreateOrderUseCase";
import { CreateOrderController } from "./CreateOrderController";

export function makeCreateOrderUseCase() {
  const orderRepository = new databaseRepositories.OrderRepository();
  const balanceRepository = new databaseRepositories.BalanceRepository();
  const userRepository = new databaseRepositories.UserRepository();
  const bookRepository = new databaseRepositories.BookRepository();

  
  const useCase = new CreateOrderUseCase(
    orderRepository,
    balanceRepository,
    userRepository,
    bookRepository,

  );
  return useCase;
}

export const createOrderController = new CreateOrderController();
