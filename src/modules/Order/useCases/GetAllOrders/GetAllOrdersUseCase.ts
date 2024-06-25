import { GetAllOrdersDTO } from "../../dtos/GetAllOrdersDTO";
import { IOrderRepository } from "../../infra/types/IOrderRepository";

export class GetAllOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(filters: GetAllOrdersDTO) {
    const ordersAndTotal = await this.orderRepository.getAll(filters);
    return ordersAndTotal;
  }
}
