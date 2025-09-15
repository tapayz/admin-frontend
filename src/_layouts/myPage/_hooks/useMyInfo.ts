import { useState, useEffect, useMemo } from "react";
import { usePartnerUpdateMutation } from "./react-query/usePartnerUpdateMutation";
import { useMyInfoQuery } from "@/_commomActions/myInfo/react-query/useMyInfoQuery";

export const useMyInfo = () => {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const partnerUpdateMutation = usePartnerUpdateMutation();
  const { data: myInfoData, isLoading: isMyInfoLoading } = useMyInfoQuery();

  const [callbackUrl, setCallbackUrl] = useState("");
  const [exchangeFeeRate, setExchangeFeeRate] = useState("");
  const [transactionFeeRate, setTransactionFeeRate] = useState("");
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [walletAddresses, setWalletAddresses] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (myInfoData) {
      setCallbackUrl(myInfoData.callbackUrl || "");
      setExchangeFeeRate(myInfoData.exchangeFeeRate ? (parseFloat(myInfoData.exchangeFeeRate) * 100).toString() : "");
      setTransactionFeeRate(myInfoData.txFeeRate ? (parseFloat(myInfoData.txFeeRate) * 100).toString() : "");

      // 지갑 주소 state 초기화
      const initialWalletAddresses: { [key: string]: string } = {};
      if (myInfoData?.PartnerWallet) {
        myInfoData.PartnerWallet.forEach((wallet) => {
          initialWalletAddresses[wallet.network] = wallet.address || "";
        });
      }
      setWalletAddresses(initialWalletAddresses);
    }
  }, [myInfoData]);

  // 지갑 주소 변경 핸들러
  const handleWalletAddressChange = (key: string, value: string) => {
    setWalletAddresses((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 수수료 입력 핸들러 (0-100 숫자와 소수점만 허용)
  const handleFeeRateChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    // 숫자와 소수점만 허용, 소수점은 하나만
    const numericValue = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");

    // 빈 값이거나 숫자인 경우
    if (numericValue === "" || numericValue === ".") {
      setter(numericValue);
      return;
    }

    const parsedValue = parseFloat(numericValue);

    // 0-100 범위 내의 유효한 숫자인 경우
    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
      setter(numericValue);
    }
  };

  // 비밀번호 변경 관련 핸들러
  const handlePasswordEditToggle = () => {
    setIsPasswordEditing(!isPasswordEditing);
    if (!isPasswordEditing) {
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handlePasswordChangeSubmit = () => {
    updatePassword(newPassword);
    setIsPasswordEditing(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const allWallets = useMemo(() => {
    const defaultWallets = [
      { network: "ETH", address: "", isActive: false },
      { network: "TRX", address: "", isActive: false },
      { network: "BTC", address: "", isActive: false },
    ];

    const existingWallets = myInfoData?.PartnerWallet || [];
    
    return defaultWallets.map((defaultWallet) => {
      const existingWallet = existingWallets.find(
        (existing) => existing.network === defaultWallet.network
      );
      return existingWallet || defaultWallet;
    });
  }, [myInfoData?.PartnerWallet]);

  const updateCallback = async (callback: string) => {
    setIsUpdating("callback");
    try {
      await partnerUpdateMutation.mutateAsync({ callback });
    } finally {
      setIsUpdating(null);
    }
  };

  const updateExchangeFee = async (feeRate: number) => {
    setIsUpdating("exchangeFee");
    try {
      await partnerUpdateMutation.mutateAsync({ feeRate });
    } finally {
      setIsUpdating(null);
    }
  };

  const updateTransactionFee = async (txFee: number) => {
    setIsUpdating("transactionFee");
    try {
      await partnerUpdateMutation.mutateAsync({ txFee });
    } finally {
      setIsUpdating(null);
    }
  };

  const updatePassword = async (password: string) => {
    setIsUpdating("password");
    try {
      await partnerUpdateMutation.mutateAsync({ password });
    } finally {
      setIsUpdating(null);
    }
  };

  const updateWalletAddress = async (network: string, address: string) => {
    setIsUpdating(`wallet_${network}`);
    try {
      let updateData: {
        ethAddress?: string;
        trxAddress?: string;
        bitAddress?: string;
      } = {};

      if (network === "ETH") {
        updateData = { ethAddress: address };
      } else if (network === "TRX") {
        updateData = { trxAddress: address };
      } else if (network === "BTC") {
        updateData = { bitAddress: address };
      }

      await partnerUpdateMutation.mutateAsync(updateData);
    } finally {
      setIsUpdating(null);
    }
  };

  return {
    myInfoData,
    // State
    callbackUrl,
    setCallbackUrl,
    exchangeFeeRate,
    setExchangeFeeRate,
    transactionFeeRate,
    setTransactionFeeRate,
    isPasswordEditing,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    walletAddresses,
    allWallets,

    // Handlers
    handleWalletAddressChange,
    handleFeeRateChange,
    handlePasswordEditToggle,
    handlePasswordChangeSubmit,

    // API calls
    updateCallback,
    updateExchangeFee,
    updateTransactionFee,
    updatePassword,
    updateWalletAddress,

    // Status
    isUpdating,
    isMyInfoLoading,
    isLoading: partnerUpdateMutation.isPending,
    error: partnerUpdateMutation.error,
  };
};
