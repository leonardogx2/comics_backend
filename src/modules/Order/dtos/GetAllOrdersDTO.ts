export interface GetAllOrdersDTO {
  page: number;
  size: number;
  sellerId?: string;
  buyerId?: string;
  gteCreatedAt?: Date;
  lteCreatedAt?: Date;
}
