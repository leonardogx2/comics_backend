import { PrismaBalanceRepository } from "@/modules/Balance/infra/repositories/prisma/BalanceRepository";
import { PrismaBookRepository } from "@/modules/Book/infra/repositories/prisma/BookRepository";
import { PrismaCartRepository } from "@/modules/Cart/infra/repositories/prisma/CartRepository";
import { PrismaFileRepository } from "@/modules/File/infra/repositories/prisma/FileRepository";
import { PrismaOrderRepository } from "@/modules/Order/infra/repositories/prisma/OrderRepository";
import { PrismaRefreshTokenRepository } from "@/modules/RefreshToken/infra/repositories/prisma/RefreshTokenRepository";
import { PrismaUserRepository } from "@/modules/User/infra/repositories/prisma/UserRepository";

export const databaseRepositories = {
  UserRepository: PrismaUserRepository,
  BookRepository: PrismaBookRepository,
  FileRepository: PrismaFileRepository,
  CartRepository: PrismaCartRepository,
  RefreshTokenRepository: PrismaRefreshTokenRepository,
  OrderRepository: PrismaOrderRepository,
  BalanceRepository: PrismaBalanceRepository,
};
