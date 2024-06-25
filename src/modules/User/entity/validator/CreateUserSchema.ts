import { AnyZodObject, z } from "zod";

export const CreateUserSchema: AnyZodObject = z.object({
  name: z.string({
    required_error: "O nome é obrigatório",
    invalid_type_error: "Nome inválido",
  }),
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "E-mail inválido",
    })
    .email({ message: "E-mail inválido" }),
  isSeller: z
    .boolean({ invalid_type_error: "Propriedade isSeller inválida" })
    .optional(),
  password: z
    .string({
      required_error: "A senha é obrigatória",
      invalid_type_error: "Senha inválida",
    })
    .min(8, "A senha é muito curta"),
});
