import { AddOrSubBalanceValueDTO } from "@/modules/Balance/dtos/AddOrSubBalanceValueDTO";
import { IBalanceRepository } from "../../types/IBalanceRepository";
import prisma from "../../../../../../prisma";

export class PrismaBalanceRepository implements IBalanceRepository {
  async addValue({
    userId,
    valueInBRL,
  }: AddOrSubBalanceValueDTO): Promise<void> {
    const balanceExists = await prisma.balance.findUnique({
      where: { userId },
    });
    if (balanceExists) {
      await prisma.balance.update({
        where: { userId },
        data: { valueInBRL: balanceExists.valueInBRL + valueInBRL },
      });
    }
  }
  async subtractValue({
    userId,
    valueInBRL,
  }: AddOrSubBalanceValueDTO): Promise<void> {
    const balanceExists = await prisma.balance.findUnique({
      where: { userId },
    });
    if (balanceExists && valueInBRL <= balanceExists.valueInBRL) {
      await prisma.balance.update({
        where: { userId },
        data: { valueInBRL: balanceExists.valueInBRL - valueInBRL },
      });
    }
  }
}
