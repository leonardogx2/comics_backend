import { Book } from "@/modules/Book/entity/Book";
import crypto from "crypto";

interface ImageProps extends Omit<Image, "id"> {
  id?: string;
}

export class Image {
  id: string;
  name: string;
  url: string | null;
  Book?: Book;
  bookId: string | null;

  constructor(props: ImageProps) {
    if (!props.id) props.id = crypto.randomUUID();
    Object.assign(this, props);
  }
}
