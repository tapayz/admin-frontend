"use client";

import React from "react";
import { myPageCss } from "./MyPage.styles";
import InputSection from "@/_components/InputSection/InputSection";
import { useLocale } from "@/_hooks/useLocale";
import Loader from "@/_components/Loader/Loader";
import Badge from "@/_components/Badge/Badge";
import Button from "@/_components/Button/Button";
import dayjs from "dayjs";
import ToggleInput from "@/_components/toggle/ToggleInput";
import TextInput from "@/_components/TextInput/TextInput";
import { useMyInfo } from "./_hooks/useMyInfo";

const MyPageContainer = () => {
  const { t } = useLocale();

  const {
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
    handleWalletAddressChange,
    handleFeeRateChange,
    handlePasswordEditToggle,
    handlePasswordChangeSubmit,
    updateCallback,
    updateExchangeFee,
    updateTransactionFee,
    updateWalletAddress,
    isUpdating,
    isLoading,
    isMyInfoLoading,
    myInfoData,
  } = useMyInfo();

  if (isMyInfoLoading) {
    return <Loader />;
  }

  if (!myInfoData) {
    return <div>{t("myPage.noData")}</div>;
  }

  return (
    <div css={myPageCss.container}>
      <section css={myPageCss.section}>
        <h2 css={myPageCss.title}>{t("profile.basicInfo")}</h2>
        <div css={myPageCss.inputSectionWrapper}>
          <InputSection
            heading="h3"
            headingText={t("profile.id")}
            cssStyle={myPageCss.inputSection}
          >
            <p>{myInfoData?.idCode}</p>
          </InputSection>
          <InputSection
            heading="h3"
            headingText={t("profile.nickname")}
            cssStyle={myPageCss.inputSection}
          >
            <p>{myInfoData?.name}</p>
          </InputSection>
          {myInfoData?.parent && (
            <InputSection
              heading="h3"
              headingText={t("transaction.agent.affiliatedAgent")}
              cssStyle={myPageCss.inputSection}
            >
              <div css={myPageCss.affiliatedAgentInfoWrapper}>
                <div css={myPageCss.affiliatedAgentInfo}>
                  <span
                    css={[
                      myPageCss.affiliatedAgentInfoItem,
                      myPageCss.affiliatedAgentInfoItemNickname,
                    ]}
                  >
                    <Badge type="infoDanger">{t("profile.nickname")}</Badge>
                    {myInfoData?.parent.name}
                  </span>
                </div>
              </div>
            </InputSection>
          )}
          <InputSection
            heading="h3"
            headingText={t("profile.password")}
            cssStyle={myPageCss.inputSection}
          >
            {!isPasswordEditing ? (
              <Button
                buttonType="gray"
                size="small"
                onClick={handlePasswordEditToggle}
              >
                {t("profile.passwordEdit")}
              </Button>
            ) : (
              <div css={myPageCss.apiKeyWrapper}>
                <div css={myPageCss.passwordChangeWrapper}>
                  <div css={myPageCss.passwordButtonWrapper}>
                    <TextInput
                      type="password"
                      cssStyle={myPageCss.apiInfoInput}
                      value={newPassword}
                      placeholder={t("profile.newPassword")}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextInput
                      type="password"
                      cssStyle={myPageCss.apiInfoInput}
                      value={confirmPassword}
                      placeholder={t("profile.confirmPassword")}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div css={myPageCss.passwordButtonWrapper}>
                  <Button
                    buttonType="gray"
                    size="small"
                    onClick={handlePasswordEditToggle}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    buttonType="primary"
                    size="small"
                    onClick={handlePasswordChangeSubmit}
                    disabled={
                      !newPassword ||
                      !confirmPassword ||
                      newPassword !== confirmPassword ||
                      isUpdating === "password" ||
                      isLoading
                    }
                  >
                    {t("profile.passwordChange")}
                  </Button>
                </div>
              </div>
            )}
          </InputSection>
          <InputSection
            heading="h3"
            headingText={t("profile.createdAt")}
            cssStyle={myPageCss.inputSection}
          >
            <p>
              {dayjs(myInfoData?.createdAt).format("YYYY. MM. DD HH:mm:ss")}
            </p>
          </InputSection>
        </div>
      </section>
      <section css={myPageCss.section}>
        <h2 css={myPageCss.title}>{t("profile.apiInfo")}</h2>
        <div css={myPageCss.inputSectionWrapper}>
          <InputSection
            heading="h3"
            headingText={"Agent ID"}
            cssStyle={myPageCss.inputSection}
          >
            <div css={myPageCss.apiKeyWrapper}>
              <p>{myInfoData?.id}</p>
            </div>
          </InputSection>
          <InputSection
            heading="h3"
            headingText={"API KEY"}
            cssStyle={myPageCss.inputSection}
          >
            {myInfoData?.api_key ? (
              <div css={myPageCss.apiKeyWrapper}>
                <p>{myInfoData?.api_key}</p>
                {/* <Button
                  buttonType="primary"
                  size="small"
                  onClick={onConfirmApiKey}
                >
                  {t("myPage.apiKeyReButtonText")}
                </Button> */}
              </div>
            ) : (
              // <Button
              //   buttonType="primary"
              //   size="small"
              //   onClick={onConfirmApiKey}
              // >
              //   {t("myPage.apiKeyButtonText")}
              // </Button>
              <p>{t("wallet.notSet")}</p>
            )}
          </InputSection>
          <InputSection
            heading="h3"
            headingText={"Callback URL"}
            cssStyle={myPageCss.inputSection}
          >
            <div css={myPageCss.apiKeyWrapper}>
              <TextInput
                cssStyle={myPageCss.apiInfoInput}
                value={callbackUrl}
                placeholder={t("wallet.notSet")}
                onChange={(e) => setCallbackUrl(e.target.value)}
              />
              <Button
                buttonType="primary"
                onClick={() => updateCallback(callbackUrl)}
                disabled={isUpdating === "callback" || isLoading}
              >
                {callbackUrl ? t("common.edit") : t("setting")}
              </Button>
            </div>
          </InputSection>
          <InputSection
            heading="h3"
            headingText={`${t("fee.exchangeFee")}(%)`}
            cssStyle={myPageCss.inputSection}
          >
            <div css={myPageCss.apiKeyWrapper}>
              <TextInput
                cssStyle={myPageCss.apiInfoInput}
                value={exchangeFeeRate}
                placeholder="0-100"
                onChange={(e) =>
                  handleFeeRateChange(e.target.value, setExchangeFeeRate)
                }
                rightIcon={<>%</>}
              />
              <Button
                buttonType="primary"
                onClick={() => updateExchangeFee(parseFloat(exchangeFeeRate))}
                disabled={
                  isUpdating === "exchangeFee" || isLoading || !exchangeFeeRate
                }
              >
                {exchangeFeeRate ? t("common.edit") : t("setting")}
              </Button>
            </div>
          </InputSection>
          <InputSection
            heading="h3"
            headingText={`${t("fee.transactionFee")}(%)`}
            cssStyle={myPageCss.inputSection}
          >
            <div css={myPageCss.apiKeyWrapper}>
              <TextInput
                cssStyle={myPageCss.apiInfoInput}
                value={transactionFeeRate}
                placeholder="0-100"
                onChange={(e) =>
                  handleFeeRateChange(e.target.value, setTransactionFeeRate)
                }
                rightIcon={<>%</>}
              />
              <Button
                buttonType="primary"
                onClick={() =>
                  updateTransactionFee(parseFloat(transactionFeeRate))
                }
                disabled={
                  isUpdating === "transactionFee" ||
                  isLoading ||
                  !transactionFeeRate
                }
              >
                {transactionFeeRate ? t("common.edit") : t("setting")}
              </Button>
            </div>
          </InputSection>
        </div>
      </section>
      <section css={myPageCss.section}>
        <h2 css={myPageCss.title}>{t("wallet.info")}</h2>
        <div css={myPageCss.inputSectionWrapper}>
          {allWallets.map((wallet, index) => {
            const walletName =
              wallet.network === "ETH"
                ? t("wallet.ethereum")
                : wallet.network === "TRX"
                ? t("wallet.tron")
                : wallet.network === "BTC"
                ? t("wallet.bitcoin")
                : wallet.network;

            const walletKey = wallet.network;
            const currentAddress =
              walletAddresses[walletKey] || wallet.address || "";

            return (
              <InputSection
                key={index}
                heading="h3"
                headingText={`${walletName} (${wallet.network}) ${t(
                  "wallet.address"
                )}`}
                cssStyle={myPageCss.inputSection}
              >
                <div css={myPageCss.apiKeyWrapper}>
                  <TextInput
                    cssStyle={myPageCss.apiInfoInput}
                    value={currentAddress}
                    placeholder={t("wallet.notSet")}
                    onChange={(e) =>
                      handleWalletAddressChange(walletKey, e.target.value)
                    }
                  />
                  <div css={myPageCss.toggleButtonWrapper}>
                    <ToggleInput
                      label={t("common.status")}
                      checked={(wallet as any).isActive || false}
                      readOnly
                    >
                      {t("common.status")}
                    </ToggleInput>
                    <Button
                      buttonType="primary"
                      size="small"
                      onClick={() => {
                        const currentAddress =
                          walletAddresses[walletKey] || wallet.address || "";
                        updateWalletAddress(wallet.network, currentAddress);
                      }}
                      disabled={
                        isUpdating === `wallet_${wallet.network}` || isLoading
                      }
                    >
                      {walletAddresses[walletKey] || wallet.address
                        ? t("common.edit")
                        : t("setting")}
                    </Button>
                  </div>
                </div>
              </InputSection>
            );
          })}
        </div>
      </section>
      {}
    </div>
  );
};

export default MyPageContainer;
