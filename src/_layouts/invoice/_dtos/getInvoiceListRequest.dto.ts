export interface GetInvoiceListRequestDto {
  size?: number;
  page?: number;
  startAt?: string;
  endAt?: string;
  customerId?: string;
  type?: string;
}
