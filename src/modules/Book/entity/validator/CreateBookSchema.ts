import { AnyZodObject, z } from "zod";

export const CreateBookSchema: AnyZodObject = z.object({
  title: z.string({
    required_error: "O título é obrigatório",
    invalid_type_error: "Título inválido",
  }),
  priceInBRL: z.coerce.number({
    required_error: "O preço é obrigatório",
    invalid_type_error: "Preço inválido",
  }),
  description: z.string({
    required_error: "A descrição é obrigatória",
    invalid_type_error: "Descrição inválida",
  }),
  writerName: z.string({
    required_error: "O escritor é obrigatório",
    invalid_type_error: "Escritor inválido",
  }),
  pencillerName: z.string({
    required_error: "O pintor do quadrinho é obrigatório",
    invalid_type_error: "Pintor do quadrinho inválido",
  }),
  coverArtistName: z.string({
    required_error: "O pintor da capa é obrigatório",
    invalid_type_error: "Pintor da capa inválido",
  }),
  releaseYear: z.coerce.number({
    required_error: "O ano de lançamento é obrigatório",
    invalid_type_error: "Ano de lançamento inválido",
  }),
  ownerId: z.string({
    required_error: "Requer id do usuário",
    invalid_type_error: "Id do usuário inválido",
  }),
  stock: z.coerce.number({ invalid_type_error: "Estoque inválido" }).optional(),
  category: z.enum(
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
      required_error: "A categoria é obrigatória",
      invalid_type_error: "Categoria inválida",
    }
  ),
});

/*
  title: string;
  priceInBRL: number;
  description: string;
  writerName: string;
  pencillerName: string;
  coverArtistName: string;
  releaseYear: number;
  ownerId: string;
  stock?: number;
  image: { url?: string; name: string };
  category: BookCategory;
*/
