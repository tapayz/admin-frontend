"use client";

import React, { useEffect, useState } from "react";
import { usePaymentDetailQuery } from "../_hooks/react-query/usePaymentDetailQuery";
import { useInitialPaymentQuery } from "../_hooks/react-query/useInitialPaymentQuery";
import { useAssetPriceQuery } from "../_hooks/react-query/useAssetPriceQuery";
import { usePaymentStore } from "../_store/usePaymentStore";
import { getFormattedPriceInfo } from "../_utils/priceCalculations";
import { Card, CardHeader, CardContent } from "./Card";
import { Row } from "./Layout";
import { Logo } from "./Logo";
import Timer from "./Timer";
import AddressViewer from "./AddressViewer";
import PaymentCardTitle from "./PaymentCardTitle";
import PendingAnimation from "./PendingAnimation";
import SuccessAnimation from "./SuccessAnimation";
import CancelAnimation from "./CancelAnimation";
import TxReceipt from "./TxReceipt";
import { GetPaymentDetailResponseDto } from "../_dtos/getPaymentDetailResponse.dto";

export const PaymentInfoCard = () => {
  const { invoiceState, setInvoiceState, setIsIntervalSet } = usePaymentStore();

  const [data, setData] = useState<
    GetPaymentDetailResponseDto | null | undefined
  >(null);

  // 초기 데이터 로딩
  const { data: initialData, isLoading: isLoadingInitial } =
    useInitialPaymentQuery();

  // 폴링 데이터 로딩
  const { data: pData } = usePaymentDetailQuery();

  // 가격 정보 로딩
  const { data: priceData } = useAssetPriceQuery();

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData && !data) {
      setData(initialData);
      setInvoiceState(initialData.state);
    }
  }, [initialData, data, setInvoiceState]);

  useEffect(() => {
    if (pData) {
      setData(pData);
      setInvoiceState(pData.state);
    }
  }, [pData]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (invoiceState === "Ready") {
      timeout = setTimeout(() => {
        setIsIntervalSet(true);
      }, 20000);
    }

    if (invoiceState === "Pending") {
      timeout = setTimeout(() => {
        setIsIntervalSet(true);
      }, 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [invoiceState, setIsIntervalSet]);

  // 가격 정보 계산
  const priceInfo =
    data && priceData ? getFormattedPriceInfo(data, priceData) : null;

  // 로딩 중이거나 데이터가 없을 때
  if (isLoadingInitial || !data) {
    return (
      <Card
        className={
          "m-auto max-w-[600px] flex flex-col overflow-hidden justify-between w-[calc(100%-40px)] max-h-[700px] h-[calc(100dvh-60px)] z-10 shadow-card backdrop-blur bg-transparent"
        }
      >
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={
        "m-auto max-w-[600px] flex flex-col overflow-hidden justify-between w-[calc(100%-40px)] max-h-[700px] h-[calc(100dvh-60px)] z-10 shadow-card backdrop-blur bg-transparent"
      }
    >
      <CardHeader>
        <Row className={"w-full justify-between"}>
          <div className="flex items-center gap-2 mb-[5px]">
            <Logo />
            <h1 className="text-xl font-semibold text-default-900">
              {process.env.NEXT_PUBLIC_SERVICE_NAME}
            </h1>
          </div>
          <Timer
            expireAt={new Date(data.expiredAt).getTime()}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        </Row>
      </CardHeader>
      <CardContent
        className={
          "space-y-8 pb-6 md:pb-8 overflow-y-auto custom-scrollbar-not-hide flex-1 flex flex-col justify-between"
        }
      >
        <div className="flex flex-col gap-6">
          <PaymentCardTitle data={data} priceInfo={priceInfo} />
        </div>
        {invoiceState === "Ready" && <AddressViewer data={data} />}
        {(invoiceState === "Pending" || invoiceState === "Wait") && (
          <PendingAnimation />
        )}
        {invoiceState === "Complete" && <SuccessAnimation />}
        {invoiceState === "Complete" && data.Transaction?.[0] && (
          <TxReceipt tx={data.Transaction[0]} />
        )}
        {(invoiceState === "Expired" || invoiceState === "Cancel") && (
          <CancelAnimation state={invoiceState} />
        )}
      </CardContent>
    </Card>
  );
};
