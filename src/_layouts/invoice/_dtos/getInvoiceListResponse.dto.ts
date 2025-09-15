export interface CustomerDto {
  id: number;
  partnerId: string;
  idCode: string;
}

export interface InvoiceItemDto {
  id: string;
  state: string;
  customer: CustomerDto;
  title: string;
  stdPrice: number;
  cashAmount: number;
  cryptoAmount: number;
  detail: string;
  createdAt: string;
}

export interface GetInvoiceListResponseDto {
  total: number;
  list: InvoiceItemDto[];
  totalPages: number;
}
