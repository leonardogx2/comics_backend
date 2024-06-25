import { CreateOrderDTO } from "@/modules/Order/dtos/CreateOrderDTO";
import { GetAllOrdersDTO } from "@/modules/Order/dtos/GetAllOrdersDTO";
import { UpdateOrderDTO } from "@/modules/Order/dtos/UpdateOrderDTO";
import { Order } from "@/modules/Order/entity/Order";
import { IOrderRepository } from "../../types/IOrderRepository";
import prisma from "../../../../../../prisma";
import { Prisma } from "@prisma/client";
import { convertPagination } from "@/shared/utils/convertPagination";

export class PrismaOrderRepository implements IOrderRepository {
  async create(data: CreateOrderDTO): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        status: "PENDING",
        Books: {
          connect: data.bookIds,
        },
        User: { connect: { id: data.userId } },
        address: data.address,
        Payment: {
          create: {
            Balance: { connect: { userId: data.userId } },
            valueInBRL: data.valueInBRL,
            status: "REALIZED",
            method: data.method,
          },
        },
      },
    });
    return order;
  }
  async findById(orderId: string): Promise<Order | undefined> {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    return order || undefined;
  }
  async getAll(
    filters: GetAllOrdersDTO
  ): Promise<{ orders: Order[]; total: number }> {
    const { buyerId, sellerId, page, size, lteCreatedAt, gteCreatedAt } =
      filters;
    const where: Prisma.OrderWhereInput = {};
    const include: Prisma.OrderInclude = { Payment: true, Books: true };
    const pagination = convertPagination({ page, size });

    if (buyerId) where.userId = buyerId;
    if (sellerId) where.Books = { some: { ownerId: sellerId } };
    if (lteCreatedAt || gteCreatedAt) {
      where.createdAt = { lte: lteCreatedAt, gte: gteCreatedAt };
    }

    const orders = await prisma.order.findMany({
      where,
      include,
      ...pagination,
      orderBy: { createdAt: "desc" },
    });
    const total = await prisma.order.count({ where });

    return { orders, total };
  }
  async update(data: UpdateOrderDTO): Promise<Order> {
    const order = await prisma.order.update({
      where: { id: data.id },
      data: {
        status: data.status || undefined,
      },
    });
    return order;
  }
}
