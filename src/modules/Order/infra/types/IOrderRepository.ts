import { CreateOrderDTO } from "../../dtos/CreateOrderDTO";
import { GetAllOrdersDTO } from "../../dtos/GetAllOrdersDTO";
import { UpdateOrderDTO } from "../../dtos/UpdateOrderDTO";
import { Order } from "../../entity/Order";

export interface IOrderRepository {
  create(data: CreateOrderDTO): Promise<Order>;
  findById(orderId: string): Promise<Order | undefined>;
  getAll(filters: GetAllOrdersDTO): Promise<{ orders: Order[]; total: number }>;
  update(data: UpdateOrderDTO): Promise<Order>;
}
