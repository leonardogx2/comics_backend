import { AppError } from "@/shared/errors/AppError";
import { AddOrRemoveCartBookDTO } from "../../dtos/AddOrRemoveCartBookDTO";
import { ICartRepository } from "../../infra/types/ICartRepository";

export class DelBookInCartUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute(data: AddOrRemoveCartBookDTO) {
    const isCartExists = await this.cartRepository.findByUserId(data.userId);
    if (!isCartExists) throw new AppError("Carrinho não encontrado.");

    await this.cartRepository.del(data);
  }
}
