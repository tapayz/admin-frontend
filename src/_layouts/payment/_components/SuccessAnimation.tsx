import React from "react";
import animationData from "./success.json"; // Lottie JSON 파일 경로
import Lottie from "react-lottie";
import { useLocale } from "@/_hooks/useLocale";

// Missing components replaced with divs
const Col = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`flex flex-col ${className}`}>{children}</div>;

type Props = {
  className?: string;
};

function SuccessAnimation({ className: _ }: Props) {
  const { t } = useLocale();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Lottie 애니메이션 데이터
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      clearCanvas: true, // 캔버스를 투명하게 설정
      backgroundAlpha: 0, // 배경을 투명하게 설정
    },
  };

  return (
    <Col className={"items-center justify-center gap-4"}>
      <Lottie
        options={defaultOptions}
        width={160}
        height={160}
        isClickToPauseDisabled={true}
        isPaused={false}
        isStopped={false}
      />
      <p className="font-semibold text-lg">
        {t("payment.transactionCompleted")}
      </p>
    </Col>
  );
}

export default SuccessAnimation;
