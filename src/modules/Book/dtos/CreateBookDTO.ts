import { BookCategory } from "../entity/BookCategory";

export interface CreateBookDTO {
  title: string;
  priceInBRL: number;
  offerInBRL?: number;
  description: string;
  writerName: string;
  pencillerName: string;
  coverArtistName: string;
  releaseYear: number;
  ownerId: string;
  stock?: number;
  image: { url?: string; name: string };
  category: BookCategory;
}
