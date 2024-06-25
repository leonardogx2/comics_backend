import { defaultHash } from "@/shared/lib/bcrypt";
import { PrismaClient } from "@prisma/client";
import { seed_user_stanlee_id } from "../seedIds";

interface IUserToCreate {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified?: boolean;
  hash: string;
  isSeller?: boolean;
  isAdmin?: boolean;
}

export class PrismaUserSeeder {
  constructor(private prisma: PrismaClient) {}

  async run() {
    const usersToCreateData: IUserToCreate[] = [
      {
        id: seed_user_stanlee_id,
        firstName: "Stan",
        lastName: "Lee",
        email: "stanlee@marvel.com",
        hash: defaultHash("12345678"),
        isSeller: true,
      },
      {
        firstName: "Admin",
        lastName: "Artcomic",
        email: "admin@admin.com",
        hash: defaultHash("1235678"),
        isAdmin: true,
      },
    ];

    for (let i = 0; i < usersToCreateData.length; i++) {
      const data = usersToCreateData[i];
      await this.prisma.user.create({
        data: {
          ...data,
          Cart: { create: {} },
          Balance: { create: { valueInBRL: 0 } },
        },
      });
    }
  }
}
