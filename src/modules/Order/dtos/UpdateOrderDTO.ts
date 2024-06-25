import { OrderStatus } from "../entity/OrderStatus";

export interface UpdateOrderDTO {
  id: string;
  status?: OrderStatus;
}
