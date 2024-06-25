import { AnyZodObject, z } from "zod";

export const ValidateRefreshTokenSchema: AnyZodObject = z.object({
  refreshTokenId: z.string({
    required_error: "O id do token é obrigatório",
    invalid_type_error: "Id do token inválido",
  }),
});
