import { Balance } from "@/modules/Balance/entity/Balance";
import { PaymentMethod } from "./PaymentMethod";
import { PaymentStatus } from "./PaymentStatus";
import { Order } from "@/modules/Order/entity/Order";
import crypto from "crypto";

interface PaymentProps extends Omit<Payment, "id"> {
  id?: string;
}

export class Payment {
  id: string;
  Order?: Order;
  Balance?: Balance;
  valueInBRL: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt?: Date | null;
  orderId: string;
  balanceId: string;

  constructor(props: PaymentProps) {
    if (!props.id) props.id = crypto.randomUUID();
    Object.assign(this, props);
  }
}

/*
model Payment {
  id         String        @id @default(uuid())
  Order      Order         @relation(fields: [orderId], references: [id])
  Balance    Balance       @relation(fields: [balanceId], references: [id])
  valueInBRL Float
  method     PaymentMethod
  status     PaymentStatus @default(PENDING)
  paidAt     DateTime?
  orderId    String        @unique
  balanceId  String

  @@map("payment")
}
*/
