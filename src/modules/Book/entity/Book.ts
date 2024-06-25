import { User } from "@/modules/User/entity/User";
import { BookCategory } from "./BookCategory";
import { Order } from "@/modules/Order/entity/Order";
import { Cart } from "@/modules/Cart/entity/Cart";
import { Image } from "@/modules/Image/entity/Image";
import crypto from "crypto";

interface BookProps extends Omit<Book, "id"> {
  id?: string;
}

export class Book {
  id: string;
  Image?: Image;
  imageId?: string;
  category: BookCategory;
  title: string;
  priceInBRL: number;
  offerInBRL?: number | null;
  releaseYear: number;
  pencillerName: string;
  writerName: string;
  coverArtistName: string;
  description: string;
  Owner?: User;
  Buyer?: User[];
  stock: number;
  Order?: Order;
  ownerId: string;
  Carts?: Cart[];

  constructor(props: BookProps) {
    if (!props.id) props.id = crypto.randomUUID();
    Object.assign(this, props);
  }
}
