export interface AssetPriceOriginDto {
  tether: string;
  eth: string;
  trx: string;
}

export interface AssetPriceFeeDto {
  tether: string;
  eth: string;
  trx: string;
}

export interface GetAssetPriceResponseDto {
  exchangeFeeRate: string;
  krw: string;
  krwWithFee: string;
  origin: AssetPriceOriginDto;
  fee: AssetPriceFeeDto;
}