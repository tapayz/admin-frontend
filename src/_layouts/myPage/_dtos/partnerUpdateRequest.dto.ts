export interface PartnerUpdateRequestDto {
  password?: string;
  name?: string;
  callback?: string;
  feeRate?: number;
  txFee?: number;
  bitAddress?: string;
  ethAddress?: string;
  trxAddress?: string;
}