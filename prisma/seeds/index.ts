import { PrismaClient } from "@prisma/client";
import { PrismaUserSeeder } from "./entities/UserSeeder";
import { PrismaBookSeeder } from "./entities/BookSeeder";

class MainSeeds {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute() {
    const seeders = [PrismaUserSeeder, PrismaBookSeeder];

    for (let i = 0; i < seeders.length; i++) {
      const Seeder = seeders[i];
      await new Seeder(this.prisma).run();
    }
  }
}

async function main() {
  const mainSeeds = new MainSeeds();
  await mainSeeds.execute();
}

main();
