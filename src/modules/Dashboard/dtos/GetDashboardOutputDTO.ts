import { OrderStatus } from "@/modules/Order/entity/OrderStatus";

export interface GetDashboardOutputDTO {
  sellsToday: number;
  balance: number;
  booksInMarket: number;
  orders: { title: string; status: OrderStatus; valueInBRL: number }[];
}
