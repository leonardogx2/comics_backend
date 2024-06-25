import { IBalanceRepository } from "@/modules/Balance/infra/types/IBalanceRepository";
import { IBookRepository } from "@/modules/Book/infra/types/IBookRepository";
import { GetDashboardOutputDTO } from "../../dtos/GetDashboardOutputDTO";
import { IUserRepository } from "@/modules/User/infra/types/IUserRepository";
import { AppError } from "@/shared/errors/AppError";
import { IOrderRepository } from "@/modules/Order/infra/types/IOrderRepository";
import { OrderStatus } from "@prisma/client";

export class GetDashboardUseCase {
  constructor(
    private userRepository: IUserRepository,
    private orderRepository: IOrderRepository,
    private bookRepository: IBookRepository
  ) {}

  async execute(userId: string): Promise<GetDashboardOutputDTO> {
    const userExists = await this.userRepository.findById(userId);
    if (!userExists) throw new AppError("Usuário não encontrado");

    const lteDate = new Date();
    const gteDate = new Date();
    lteDate.setHours(23, 59, 59, 999);
    gteDate.setHours(0, 0, 0, 0);

    const sellsToday = (
      await this.orderRepository.getAll({
        page: 1,
        size: 1,
        lteCreatedAt: lteDate,
        gteCreatedAt: gteDate,
        sellerId: userId,
      })
    ).total;

    const booksInMarket = (
      await this.bookRepository.getAll({
        page: 1,
        size: 1,
        deleted: false,
        inStock: true,
        ownerId: userId,
      })
    ).total;

    const ordersAndTotal = await this.orderRepository.getAll({
      page: 1,
      size: 100,
    });

    const orders: { title: string; status: OrderStatus; valueInBRL: number }[] =
      [];

    ordersAndTotal.orders.map((order) => {
      const ownerBooks =
        order.Books?.filter((book) => book.ownerId === userId) || [];
      ownerBooks.map((book) => {
        orders.push({
          title: book.title,
          status: order.status,
          valueInBRL: book.offerInBRL || book.priceInBRL,
        });
      });
    });

    const output = {
      sellsToday,
      balance: userExists.Balance?.valueInBRL || 0,
      booksInMarket,
      orders,
    };

    return output;
  }
}
