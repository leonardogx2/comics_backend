import { Book } from "@/modules/Book/entity/Book";
import { User } from "@/modules/User/entity/User";

interface CartProps extends Omit<Cart, "id"> {
  id?: string;
}

export class Cart {
  id: string;
  User?: User;
  userId: string;
  Books?: Book[];

  constructor(props: CartProps) {
    if (!props.id) props.id = crypto.randomUUID();
    Object.assign(this, props);
  }
}
