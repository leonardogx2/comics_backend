import { Cart } from "@/modules/Cart/entity/Cart";
import { ICartRepository } from "../../types/ICartRepository";
import prisma from "../../../../../../prisma";
import { AddOrRemoveCartBookDTO } from "@/modules/Cart/dtos/AddOrRemoveCartBookDTO";

export class PrismaCartRepository implements ICartRepository {
  async add(data: AddOrRemoveCartBookDTO): Promise<void> {
    await prisma.cart.update({
      where: { userId: data.userId },
      data: {
        Books: { connect: { id: data.bookId } },
      },
    });
  }
  async del(data: AddOrRemoveCartBookDTO): Promise<void> {
    await prisma.cart.update({
      where: { userId: data.userId },
      data: {
        Books: { disconnect: { id: data.bookId } },
      },
    });
  }
  async findByUserId(userId: string): Promise<Cart> {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    return cart as Cart;
  }
}
