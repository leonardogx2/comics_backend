import { validateSchemaOrThrowAppError } from "@/shared/utils/validateSchemaOrThrowAppError";
import {
  CreateOrderControllerDTO,
  CreateOrderDTO,
} from "../../dtos/CreateOrderDTO";
import { CreateOrderSchema } from "../../entity/validator/CreateOrderSchema";
import { IOrderRepository } from "../../infra/types/IOrderRepository";
import { IUserRepository } from "@/modules/User/infra/types/IUserRepository";
import { AppError } from "@/shared/errors/AppError";
import { IBookRepository } from "@/modules/Book/infra/types/IBookRepository";
import { IBalanceRepository } from "@/modules/Balance/infra/types/IBalanceRepository";

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private balanceRepository: IBalanceRepository,
    private userRepository: IUserRepository,
    private bookRepository: IBookRepository
  ) {}

  async execute(data: CreateOrderControllerDTO) {
    validateSchemaOrThrowAppError(CreateOrderSchema, data);
    let orderValueInBRL: number = 30;
    const balancesToUpdate: { userId: string; valueInBRL: number }[] = [];

    const userExists = await this.userRepository.findById(data.userId);
    if (!userExists) throw new AppError("Usuário inválido");

    const booksInCart = (
      await this.bookRepository.getAll({
        page: 1,
        size: 20,
        userId: data.userId,
        inCart: true,
        deleted: false,
      })
    ).books;

    if (!booksInCart.length) throw new AppError("Requer pelo menos um livro");

    for (let i = 0; i < booksInCart.length; i++) {
      const bookInCart = booksInCart[i];

      if (bookInCart.stock <= 0)
        throw new AppError(`O livro ${bookInCart.title} não está disponível`);

      await this.bookRepository.update({
        id: bookInCart.id,
        stock: bookInCart.stock - 1,
      });
      const bookValueInBRL = bookInCart.offerInBRL || bookInCart.priceInBRL;
      orderValueInBRL += bookValueInBRL;
      balancesToUpdate.push({
        userId: bookInCart.ownerId,
        valueInBRL: bookValueInBRL,
      });
    }

    const orderData: CreateOrderDTO = {
      method: data.method,
      userId: data.userId,
      bookIds: booksInCart.map((book) => ({ id: book.id })),
      name: data.name,
      address: `Brasil, ${data.state}, ${data.city}(${data.cep}), ${data.neighborhood}, ${data.streetName} ${data.streetNumber}`,
      valueInBRL: orderValueInBRL,
    };

    const order = await this.orderRepository.create(orderData);

    for (let i = 0; i < balancesToUpdate.length; i++) {
      const updateBalanceData = balancesToUpdate[i];
      await this.balanceRepository.addValue(updateBalanceData);
    }

    await this.userRepository.cleanCart(data.userId);

    return order;
  }
}
