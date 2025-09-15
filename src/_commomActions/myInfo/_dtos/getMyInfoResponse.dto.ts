export interface PartnerWallet {
  network: string;
  address: string | null;
}

export interface GetMyInfoResponseDto {
  id: string;
  key: number;
  name: string;
  icon: string;
  level: number;
  idCode: string;
  parentId: string | null;
  isActive: boolean;
  refreshToken: string;
  api_key: string;
  exchangeFeeRate: string | null;
  txFeeRate: string | null;
  callbackUrl: string | null;
  createdAt: string;
  updatedAt: string;
  parent: {
    name: string;
  } | null;
  PartnerWallet: PartnerWallet[];
}
