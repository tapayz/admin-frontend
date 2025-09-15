export interface TransactionAssetDto {
  id: number;
  type: string;
  name: string;
  symbol: string;
  network: string;
  digit: number;
  price: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface TransactionCustomerDto {
  id: number;
  partnerId: string;
  name: string;
  icon: string;
  country: string;
  idCode: string;
  isActive: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionInvoiceDto {
  id: string;
  partnerId: string;
  customerId: number;
  idCode: string;
  title: string;
  state: string;
  cashAssetId: number;
  cashAmount: string;
  stdPrice: string;
  cryptoAssetId: number;
  cryptoAmount: string;
  walletId: number;
  expiredAt: string;
  completedAt: string | null;
  createdAt: string;
}

export interface TransactionItemDto {
  id: number;
  partnerId: string;
  customerId: number;
  invoiceId: string;
  idCode: string;
  assetId: number;
  from: string;
  to: string;
  amount: string;
  fee: string;
  balance: string | null;
  state: 'Ready' | 'Pending' | 'Complete' | 'Failed';
  type: 'DEPOSIT' | 'WITHDRAW';
  detail: string;
  blockNum: number;
  memo: string | null;
  createdAt: string;
  updatedAt: string;
  Asset: TransactionAssetDto;
  customer: TransactionCustomerDto;
  invoice: TransactionInvoiceDto;
}

export interface GetTransactionListResponseDto {
  total: number;
  totalPages: number;
  list: TransactionItemDto[];
}