export interface PartnerCreateDto {
  id: string;
  name: string;
  password: string;
  rePassword: string;
  feeRate: number;
  txFeeRate: number;
}
