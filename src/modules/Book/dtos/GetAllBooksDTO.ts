import { BookCategory } from "../entity/BookCategory";

export interface GetAllBooksDTO {
  page: number;
  size: number;
  id?: string;
  releaseYear?: number;
  author?: string;
  startPrice?: number;
  endPrice?: number;
  ownerId?: string;
  title?: string;
  exactlyTitle?: string;
  category?: BookCategory;
  inCart?: boolean;
  userId?: string;
  orderBy?: "bigPrice" | "lowPrice" | "mostSelled" | "az" | "za";
  inStock?: boolean;
  inOffer?: boolean;
  deleted?: boolean;
  userPreference?: boolean;
}
