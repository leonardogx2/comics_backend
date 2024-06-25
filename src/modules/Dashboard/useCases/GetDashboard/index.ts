import { databaseRepositories } from "@/database";
import { GetDashboardUseCase } from "./GetDashboardUseCase";
import { GetDashboardController } from "./GetDashboardController";

export function makeGetDashboardUseCase() {
  const userRepository = new databaseRepositories.UserRepository();
  const orderRepository = new databaseRepositories.OrderRepository();
  const bookRepository = new databaseRepositories.BookRepository();
  const useCase = new GetDashboardUseCase(
    userRepository,
    orderRepository,
    bookRepository
  );

  return useCase;
}

export const getDashboardController = new GetDashboardController();
