import { AnyZodObject, z } from "zod";

export const CreateFileSchema: AnyZodObject = z.object({
  fieldname: z.string({
    required_error: "O nome do arquivo é obrigatório",
    invalid_type_error: "Nome do arquivo inválido",
  }),
  originalname: z.string({
    required_error: "O nome original do arquivo é obrigatório",
    invalid_type_error: "Nome original do arquivo inválido",
  }),
  encoding: z.string({
    required_error: "A codificação do arquivo é obrigatória",
    invalid_type_error: "Codificação do arquivo inválida",
  }),
  mimetype: z.string({
    required_error: "O tipo MIME do arquivo é obrigatório",
    invalid_type_error: "Tipo MIME do arquivo inválido",
  }),
  buffer: z.instanceof(Buffer),
  size: z.number({
    required_error: "O tamanho do arquivo é obrigatório",
    invalid_type_error: "Tamanho do arquivo inválido",
  }),
});
