import React, { useEffect, useState } from "react";
import animationData from "./pending.json"; // Lottie JSON 파일 경로
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

function PendingAnimation({ className: _ }: Props) {
  const { t } = useLocale();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Lottie 애니메이션 데이터
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Col className={"items-center justify-center gap-4 "}>
      <Lottie
        options={defaultOptions}
        width={160}
        height={160}
        isClickToPauseDisabled={true}
        isPaused={false}
        isStopped={false}
      />
      <p className="font-semibold text-lg">
        {t("payment.transactionVerifying")}
        {dots}
      </p>
    </Col>
  );
}

export default PendingAnimation;
