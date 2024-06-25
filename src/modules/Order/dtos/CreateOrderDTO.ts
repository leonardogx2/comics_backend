import { PaymentMethod } from "@/modules/Payment/entity/PaymentMethod";

export interface CreateOrderControllerDTO {
  userId: string;
  method: PaymentMethod;
  name: string;
  cpf?: string;
  cardCode?: string;
  expirationDate?: Date;
  cvv?: number;
  plots?: number;
  state: string;
  cep: string;
  city: string;
  neighborhood: string;
  streetName: string;
  streetNumber: string;
}

export interface CreateOrderDTO {
  userId: string;
  bookIds: { id: string }[];
  valueInBRL: number;
  method: PaymentMethod;
  name: string;
  address: string;
}
