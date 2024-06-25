import { AddOrSubBalanceValueDTO } from "../../dtos/AddOrSubBalanceValueDTO";

export interface IBalanceRepository {
  addValue({ userId, valueInBRL }: AddOrSubBalanceValueDTO): Promise<void>;
  subtractValue({ userId, valueInBRL }: AddOrSubBalanceValueDTO): Promise<void>;
}
