import { Book } from "@/modules/Book/entity/Book";
import { Payment } from "@/modules/Payment/entity/Payment";
import { User } from "@/modules/User/entity/User";
import { OrderStatus } from "./OrderStatus";

export class Order {
  id: string;
  status: OrderStatus;
  Books?: Book[];
  User?: User;
  userId: string;
  address: string;
  Payment?: Payment | null;
}
