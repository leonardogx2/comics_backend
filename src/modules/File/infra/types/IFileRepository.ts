import { CreateFileDTO } from "../../dtos/CreateFileDTO";
import { File } from "../../entities/File";

export interface IFileRepository {
  create(data: CreateFileDTO): Promise<{ name: string }>;
  delete(fileName: string): Promise<void>;
}
