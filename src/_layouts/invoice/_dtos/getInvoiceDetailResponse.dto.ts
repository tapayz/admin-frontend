export interface InvoiceDetailPartnerDto {
  id: string;
  name: string;
  icon: string;
}

export interface InvoiceDetailCustomerDto {
  id: number;
  name: string;
  icon: string;
}

export interface InvoiceDetailWalletDto {
  address: string;
  network: string;
}

export const cryptoAssetIdEnum = {
  1: "Korea Won",
  2: "USD Dollar",
  101: "TRX",
  102: "ETH",
  1001: "USDT-TRX",
  1002: "USDT-ETH",
} as const;

export type CryptoAssetId = keyof typeof cryptoAssetIdEnum;

export interface GetInvoiceDetailResponseDto {
  id: string;
  state: string;
  partner: InvoiceDetailPartnerDto;
  customer: InvoiceDetailCustomerDto;
  title: string;
  stdPrice: string;
  cashAmount: string;
  cryptoAssetId: CryptoAssetId;
  cryptoAmount: string;
  wallet: InvoiceDetailWalletDto;
  detail: any[];
  expiredAt: string;
  createdAt: string;
  Transaction: any[];
}
