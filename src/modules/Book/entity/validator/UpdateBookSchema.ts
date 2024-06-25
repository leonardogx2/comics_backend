import { AnyZodObject, z } from "zod";

export const UpdateBookSchema: AnyZodObject = z.object({
  id: z.string({
    required_error: "O id do quadrinho é obrigatório",
    invalid_type_error: "Id inválido",
  }),
  title: z.string({ invalid_type_error: "Título inválido" }).optional(),
  priceInBRL: z.coerce
    .number({ invalid_type_error: "Preço inválido" })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Descrição inválida ",
    })
    .optional(),
  writerName: z
    .string({ invalid_type_error: "O escritor é inválido" })
    .optional(),
  pencillerName: z
    .string({ invalid_type_error: "O pintor do quadrinho é inválido" })
    .optional(),
  coverArtistName: z
    .string({ invalid_type_error: "O pintor da capa é inválido" })
    .optional(),
  releaseYear: z.coerce
    .number({ invalid_type_error: "Ano de lançamento inválido" })
    .optional(),
  stock: z.coerce.number({ invalid_type_error: "Estoque inválido" }).optional(),
  category: z
    .enum(
      [
        "ACTION",
        "HORROR",
        "DRAMA",
        "FANTASY",
        "COMEDY",
        "SUSPENSE",
        "ROMANTIC",
        "ADVENTURE",
        "FICTION",
        "SUPERHERO",
      ],
      {
        invalid_type_error: "Categoria inválida",
      }
    )
    .optional(),
});
