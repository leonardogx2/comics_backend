import { CreateFileDTO } from "@/modules/File/dtos/CreateFileDTO";
import { IFileRepository } from "../../types/IFileRepository";
import { promises as fs } from "fs";
import { join } from "path";
import { AppError } from "@/shared/errors/AppError"; // Assuming AppError is defined in this path

export class PrismaFileRepository implements IFileRepository {
  private readonly uploadPath = join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "..",
    "public",
    "uploads"
  );

  constructor() {
    console.log("Upload path:", this.uploadPath); // Verificar o caminho durante a inicialização
    fs.mkdir(this.uploadPath, { recursive: true }).catch(console.error);
  }

  async create(data: CreateFileDTO): Promise<{ name: string }> {
    const fileName = `${Date.now()}-${data.originalname}`;
    const filePath = join(this.uploadPath, fileName);

    try {
      await fs.writeFile(filePath, data.buffer);
      return { name: fileName };
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
      throw new AppError("Erro ao salvar imagem", 500); // AppError with status code
    }
  }

  async delete(fileId: string): Promise<void> {
    const filePath = join(this.uploadPath, fileId);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
      throw new AppError("Erro ao deletar imagem", 500); // AppError with status code
    }
  }
}
