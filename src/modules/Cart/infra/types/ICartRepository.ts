import { AddOrRemoveCartBookDTO } from "../../dtos/AddOrRemoveCartBookDTO";
import { Cart } from "../../entity/Cart";

export interface ICartRepository {
  add(data: AddOrRemoveCartBookDTO): Promise<void>;
  del(data: AddOrRemoveCartBookDTO): Promise<void>;
  findByUserId(userId: string): Promise<Cart>;
}
