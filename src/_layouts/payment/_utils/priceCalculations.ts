import { cryptoAssetIdEnum } from "@/_layouts/invoice/_dtos/getInvoiceDetailResponse.dto";
import { GetAssetPriceResponseDto } from "../_dtos/getAssetPriceResponse.dto";
import { GetPaymentDetailResponseDto } from "../_dtos/getPaymentDetailResponse.dto";

// cryptoAssetId별 암호화폐 타입 매핑
const CRYPTO_ASSET_MAP = {
  101: "trx",      // TRX
  102: "eth",      // ETH
  1001: "tether",  // USDT-TRX
  1002: "tether",  // USDT-ETH
} as const;

// cryptoAssetId에 맞는 암호화폐 가격 정보 가져오기
export const getPriceByCryptoAssetId = (
  cryptoAssetId: string | number,
  priceData: GetAssetPriceResponseDto
) => {
  if (!priceData || !priceData.origin || !priceData.fee) {
    return null;
  }

  const assetIdNumber = typeof cryptoAssetId === 'string' ? parseInt(cryptoAssetId) : cryptoAssetId;
  const cryptoType = CRYPTO_ASSET_MAP[assetIdNumber as keyof typeof CRYPTO_ASSET_MAP] || "tether";

  return {
    originPrice: parseFloat(priceData.origin[cryptoType] || "0"),
    feePrice: parseFloat(priceData.fee[cryptoType] || "0"),
    krwPrice: parseFloat(priceData.krw || "0"),
    krwWithFeePrice: parseFloat(priceData.krwWithFee || "0"),
    exchangeFeeRate: parseFloat(priceData.exchangeFeeRate || "0"),
  };
};

// 암호화폐 금액을 KRW로 변환
export const convertCryptoToKrw = (
  cryptoAmount: string,
  cryptoAssetId: string | number,
  priceData: GetAssetPriceResponseDto
) => {
  const amount = parseFloat(cryptoAmount);
  const priceInfo = getPriceByCryptoAssetId(cryptoAssetId, priceData);

  if (!priceInfo) return 0;

  return amount * priceInfo.originPrice;
};

// 수수료 포함 KRW 금액 계산
export const convertCryptoToKrwWithFee = (
  cryptoAmount: string,
  cryptoAssetId: string | number,
  priceData: GetAssetPriceResponseDto
) => {
  const amount = parseFloat(cryptoAmount);
  const priceInfo = getPriceByCryptoAssetId(cryptoAssetId, priceData);

  if (!priceInfo) return 0;

  return amount * priceInfo.feePrice;
};

// 수수료 계산
export const calculateFee = (
  cryptoAmount: string,
  cryptoAssetId: string | number,
  priceData: GetAssetPriceResponseDto
) => {
  const originalKrw = convertCryptoToKrw(cryptoAmount, cryptoAssetId, priceData);
  const krwWithFee = convertCryptoToKrwWithFee(
    cryptoAmount,
    cryptoAssetId,
    priceData
  );

  return krwWithFee - originalKrw;
};

// 포맷된 가격 정보 반환
export const getFormattedPriceInfo = (
  data: GetPaymentDetailResponseDto | null | undefined,
  priceData: GetAssetPriceResponseDto
) => {
  if (!data?.cryptoAmount || !data?.cryptoAssetId || !priceData) {
    return null;
  }

  const cryptoAssetId = data.cryptoAssetId;
  const cryptoAmount = data.cryptoAmount;

  const priceInfo = getPriceByCryptoAssetId(cryptoAssetId, priceData);
  if (!priceInfo) return null;

  const originalKrw = convertCryptoToKrw(cryptoAmount, cryptoAssetId, priceData);
  const krwWithFee = convertCryptoToKrwWithFee(
    cryptoAmount,
    cryptoAssetId,
    priceData
  );
  const fee = calculateFee(cryptoAmount, cryptoAssetId, priceData);

  return {
    cryptoAmount: parseFloat(cryptoAmount),
    cryptoSymbol: cryptoAssetIdEnum[cryptoAssetId] || 'Unknown',
    originalKrw: Math.round(originalKrw),
    krwWithFee: Math.round(krwWithFee),
    fee: Math.round(fee),
    exchangeFeeRate: Math.round(priceInfo.exchangeFeeRate * 100), // 백분율로 변환
    network: data.wallet?.network || 'Unknown',
  };
};

// === Backward Compatibility Functions (Deprecated) ===
// @deprecated - Use getPriceByCryptoAssetId instead
export const getPriceByNetwork = (
  network: string,
  priceData: GetAssetPriceResponseDto
) => {
  // 네트워크를 cryptoAssetId로 변환하여 새로운 함수 호출
  const networkToCryptoAssetIdMap: Record<string, number> = {
    'TRX': 101,
    'ETH': 102,
    'TETHER': 1001,
    'USDT': 1001,
  };
  
  const cryptoAssetId = networkToCryptoAssetIdMap[network?.toUpperCase()] || 1001;
  return getPriceByCryptoAssetId(cryptoAssetId, priceData);
};
