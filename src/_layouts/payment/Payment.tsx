"use client";

import React, { useEffect } from "react";
import PaymentBg from "./_components/PaymentBg";
import { Contents, Main } from "./_components/Layout";
import { PaymentInfoCard } from "./_components/PaymentInfoCard";
import { usePaymentStore } from "./_store/usePaymentStore";

type PaymentLayoutProps = {
  payId: string;
};

const PaymentLayout = ({ payId }: PaymentLayoutProps) => {
  const { setPaymentId } = usePaymentStore();

  useEffect(() => {
    setPaymentId(payId);
  }, [payId, setPaymentId]);

  return (
    <Main>
      <PaymentBg />
      <Contents className={"h-screen flex items-center justify-center"}>
        <PaymentInfoCard />
      </Contents>
    </Main>
  );
};

export default PaymentLayout;
