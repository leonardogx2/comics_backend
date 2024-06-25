import { AnyZodObject, z } from "zod";

export const CreateRefreshTokenSchema: AnyZodObject = z.object({
  userId: z.string({
    invalid_type_error: "Id de usuário inválido",
    required_error: "Id do usuário é obrigatório",
  }),
});
