import { Payment } from "@/modules/Payment/entity/Payment";
import { User } from "@/modules/User/entity/User";
import crypto from "crypto";

interface BalanceProps extends Omit<Balance, "id"> {
  id?: string;
}

export class Balance {
  id: string;
  User?: User;
  valueInBRL: number;
  userId: string;
  Payments?: Payment;

  constructor(props: BalanceProps) {
    if (!props.id) props.id = crypto.randomUUID();
    Object.assign(this, props);
  }
}
