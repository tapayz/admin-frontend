export interface PartnerInfoUpdateRequestDto {
  password?: string;
  name?: string;
  callback?: string;
  feeRate?: number;
  bitAddress?: string;
  ethAddress?: string;
  trxAddress?: string;
}
