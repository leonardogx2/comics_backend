import { Balance } from "@/modules/Balance/entity/Balance";
import { Cart } from "@/modules/Cart/entity/Cart";
import { Image } from "@/modules/Image/entity/Image";
import crypto from "crypto";
import { Book } from "@/modules/Book/entity/Book";
import { Order } from "@/modules/Order/entity/Order";

interface UserProps extends Omit<User, "id"> {
  id?: string;
}

export class User {
  id: string;
  hash: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  Balance?: Balance;
  Cart?: Cart;
  BookAsOwner?: Book[];
  Orders?: Order[];
  deleted: boolean;
  isAdmin: boolean;
  isSeller: boolean;

  constructor(props: UserProps) {
    if (!props.id) props.id = crypto.randomUUID();
    Object.assign(this, props);
  }
}
