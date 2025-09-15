import { CryptoAssetId } from "@/_layouts/invoice/_dtos/getInvoiceDetailResponse.dto";

export interface PaymentDetailPartnerDto {
  id: string;
  name: string;
  icon: string;
}

export interface PaymentDetailCustomerDto {
  id: number;
  name: string;
  icon: string;
}

export interface PaymentDetailWalletDto {
  address: string;
  network: string;
}

export interface PaymentDetailCryptoDto {
  symbol: string;
}

export interface PaymentDetailCashDto {
  symbol: string;
}

export interface PaymentDetailTransactionDto {
  id: string;
  detail: string;
  from: string;
  to: string;
  amount: string;
  hash: string;
  updatedAt: string;
}

export interface GetPaymentDetailResponseDto {
  id: string;
  state: string;
  partner: PaymentDetailPartnerDto;
  customer: PaymentDetailCustomerDto;
  title: string;
  stdPrice: string;
  cashAmount: string;
  cryptoAmount: string;
  cryptoAssetId: CryptoAssetId;
  crypto: PaymentDetailCryptoDto;
  cash: PaymentDetailCashDto;
  wallet: PaymentDetailWalletDto;
  detail: any[];
  expiredAt: string;
  createdAt: string;
  Transaction: PaymentDetailTransactionDto[];
}
