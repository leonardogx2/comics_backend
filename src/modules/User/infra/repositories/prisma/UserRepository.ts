import { CreateUserDTO } from "@/modules/User/dtos/CreateUserDTO";
import { User } from "@/modules/User/entity/User";
import { IUserRepository } from "../../types/IUserRepository";
import prisma from "../../../../../../prisma";
import { UpdateUserDTO } from "@/modules/User/dtos/UpdateUserDTO";

export class PrismaUserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        hash: data.hash!,
        isSeller: data.isSeller,
        Cart: { create: {} },
        Balance: { create: { valueInBRL: 0 } },
      },
    });

    return user;
  }

  async update(data: UpdateUserDTO): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id: data.id },
      data: {
        isSeller: data.isSeller,
      },
    });

    return updatedUser;
  }
  async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { Balance: true, Cart: true },
    });
    return (user as User) || undefined;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user || undefined;
  }
  getAll(): Promise<{ users: User[]; total: number }> {
    throw new Error("Method not implemented.");
  }

  async cleanCart(userId: string): Promise<void> {
    await prisma.cart.update({
      where: { userId },
      data: {
        Books: { set: [] },
      },
    });
  }
}
