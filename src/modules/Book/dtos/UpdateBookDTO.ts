import { BookCategory } from "../entity/BookCategory";

export interface UpdateBookDTO {
  id: string;
  title?: string;
  image?: { url?: string; name: string };
  priceInBRL?: number;
  description?: string;
  writerName?: string;
  pencillerName?: string;
  coverArtistName?: string;
  releaseYear?: number;
  stock?: number;
  category?: BookCategory;
}
