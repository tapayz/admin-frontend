import React from "react";
import { ArrowRight, Network, Package } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GetPaymentDetailResponseDto } from "../_dtos/getPaymentDetailResponse.dto";

// Missing Avatar component - replaced with div
const Avatar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`${className} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center`}
  >
    {children}
  </div>
);

const AvatarImage = ({ src, alt }: { src?: string; alt?: string }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

const AvatarFallback = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full flex items-center justify-center text-sm font-semibold">
    {children}
  </div>
);

type Props = {
  data: GetPaymentDetailResponseDto | null | undefined;
  priceInfo?: {
    cryptoAmount: number;
    cryptoSymbol: string;
    originalKrw: number;
    krwWithFee: number;
    fee: number;
    exchangeFeeRate: number;
    network: string;
  } | null;
};

function PaymentCardTitle({ data, priceInfo }: Props) {
  const { t, i18n } = useTranslation();

  // Force locale to 'en' for this component only
  React.useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return (
    <>
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary">
          <Network className="w-4 h-4 mr-2" />
          <span className="text-sm font-semibold">
            {data?.wallet?.network} {t("payment.network")}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center text-base font-medium text-gray-800">
            <Package className="w-5 h-5 mr-2" />
            <span aria-label={t("payment.productName")}>{data?.title}</span>
          </div>
          <div>
            <p className="text-2xl font-bold">
              {priceInfo?.cryptoAmount?.toLocaleString() ??
                parseFloat(data?.cryptoAmount ?? "0").toLocaleString()}{" "}
              <span className="md:text-[20px] text-[18px]">
                {priceInfo?.cryptoSymbol ?? ""}
              </span>
            </p>
            {priceInfo ? (
              <div className="space-y-1 mt-1">
                <p className="text-sm text-gray-500">
                  ≈ {priceInfo.originalKrw.toLocaleString()} KRW (
                  {t("payment.feeExcluded")})
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  ≈ {priceInfo.krwWithFee.toLocaleString()} KRW (
                  {t("payment.feeIncluded")})
                </p>
                <p className="text-xs text-orange-600">
                  {t("payment.fee")}: {priceInfo.fee.toLocaleString()} KRW (
                  {priceInfo.exchangeFeeRate}%)
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-1">
                ≈ {parseFloat(data?.cashAmount ?? "0").toLocaleString()}{" "}
                {data?.cash?.symbol}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <div className="flex flex-col items-center">
          <Avatar className={"w-12 h-12 mb-1"}>
            <AvatarImage
              src={
                data?.customer?.icon?.split(".svg")[0]
                  ? `${data?.customer?.icon?.split(".svg")[0]}.jpeg`
                  : "/images/default.svg"
              }
            />
          </Avatar>
          <span className="text-sm text-gray-600">{data?.customer?.name}</span>
        </div>
        <ArrowRight className="text-gray-400" />
        <div className="flex flex-col items-center">
          <Avatar className={"w-12 h-12 mb-1"}>
            <AvatarImage
              src={
                data?.partner?.icon?.split(".svg")[0]
                  ? `${data?.partner?.icon?.split(".svg")[0]}.jpeg`
                  : "/images/meta.png"
              }
            />
          </Avatar>
          <span className="text-sm text-gray-600">{data?.partner?.name}</span>
        </div>
      </div>
    </>
  );
}

export default PaymentCardTitle;
