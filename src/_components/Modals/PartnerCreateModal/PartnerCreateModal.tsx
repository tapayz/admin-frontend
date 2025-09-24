"use client";

import React from "react";
import ReactModal from "react-modal";
import { BaseModalProps } from "../_types/BaseModal.type";
import Button from "@/_components/Button/Button";
import { Lock, Percent } from "lucide-react";
import TextInput from "@/_components/TextInput/TextInput";
import { partnerCreateModalCss } from "./PartnerCreateModal.styles";
import InputSection from "@/_components/InputSection/InputSection";
import { useLocale } from "@/_hooks/useLocale";
import ConfirmModal from "@/_components/Modals/ConfirmModal/ConfirmModal";
import { usePartnerCreateModalForm } from "./_hooks/usePartnerCreateModalForm";
import ErrorMessage from "@/_components/ErrorMessage/ErrorMessage";
import { useCreateModalStore } from "./_store/useCreateModalStore";
import { usePrefixStore } from "./_store/useCheckDuplicateStore";
import { useAgencyInfoQuery } from "@/_commomActions/agencyInfo/react-query/useAgencyInfoQuery";
import Loader from "@/_components/Loader/Loader";
import { useResize } from "@/_hooks/useResize";

interface PartnerCreateModalProps extends BaseModalProps {
  title: string;
  partnerId?: number;
}

const PartnerCreateModal = ({
  isOpen,
  onClose,
  title,
  partnerId,
}: PartnerCreateModalProps) => {
  const { t } = useLocale();
  const {
    isExitModalOpen,
    isConfirmModalOpen,
    setIsExitModalOpen,
    setIsConfirmModalOpen,
  } = useCreateModalStore();
  const { setIsPrefixCheck, resetPrefixValues } = usePrefixStore();
  const { isMobile } = useResize();
  const { data: partnerInfo, isLoading: isPartnerInfoLoading } =
    useAgencyInfoQuery(partnerId ?? null);
  const handleSuccess = () => {
    setIsExitModalOpen(false);
    setIsPrefixCheck(false);
    resetPrefixValues();
    onClose();
  };

  const {
    register,
    errors,
    onPartnerSubmit,
    isDirty,
    watch,
    onPartnerInfoSubmit,
    updateForm,
  } = usePartnerCreateModalForm({
    data: partnerInfo,
    onSuccess: handleSuccess,
  });

  const handleCloseModal = () => {
    if (partnerId) {
      if (watch("password") || watch("rePassword")) {
        setIsExitModalOpen(true);
      } else {
        setIsExitModalOpen(false);
        onClose();
      }

      return;
    }

    if (isDirty) {
      setIsExitModalOpen(true);
    } else {
      setIsPrefixCheck(false);
      resetPrefixValues();
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setIsExitModalOpen(false);
  };

  const handleAllClose = () => {
    setIsExitModalOpen(false);
    setIsPrefixCheck(false);
    resetPrefixValues();
    onClose();
  };

  if (partnerId && isPartnerInfoLoading) return <Loader />;

  const Modal = ReactModal as any;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          maxWidth: "600px",
          width: "calc(100% - 40px)",
          maxHeight: isMobile ? "620px" : "800px",
          height: "95dvh",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px 20px 30px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <section css={partnerCreateModalCss.wrapper}>
        <h2 css={partnerCreateModalCss.title}>{title}</h2>
        <div css={partnerCreateModalCss.formWrapper}>
          <form
            css={partnerCreateModalCss.form}
            onSubmit={partnerInfo ? onPartnerInfoSubmit : onPartnerSubmit}
          >
            <div
              css={partnerCreateModalCss.formContentWrapper}
              className="custom-scrollbar-not-hide"
            >
              <div css={partnerCreateModalCss.gridWrapper(2)}>
                <InputSection
                  headingText={
                    <div css={partnerCreateModalCss.labelWrapper}>
                      <h3>{t("profile.id")}</h3>
                    </div>
                  }
                  gridType="col"
                  cssStyle={partnerCreateModalCss.inputSection}
                >
                  <TextInput
                    aria-label="id"
                    {...register("id")}
                    disabled={partnerId ? true : false}
                  />
                  {!partnerId && errors.id && (
                    <ErrorMessage isRelative={true}>
                      {t(errors.id.message ?? "")}
                    </ErrorMessage>
                  )}
                </InputSection>
                <InputSection
                  headingText={
                    <div css={partnerCreateModalCss.labelWrapper}>
                      <h3>{t("profile.name")}</h3>
                    </div>
                  }
                  gridType="col"
                  cssStyle={partnerCreateModalCss.inputSection}
                >
                  <TextInput
                    aria-label="name"
                    {...(partnerInfo
                      ? updateForm.register("name")
                      : register("name"))}
                    disabled={partnerId ? false : false}
                  />
                  {(errors.name || updateForm.formState.errors.name) && (
                    <ErrorMessage isRelative={true}>
                      {t(
                        errors.name?.message ??
                          updateForm.formState.errors.name?.message ??
                          ""
                      )}
                    </ErrorMessage>
                  )}
                </InputSection>
              </div>
              <div css={partnerCreateModalCss.gridWrapper(2)}>
                <InputSection
                  heading="h3"
                  headingText={t("profile.password")}
                  gridType="col"
                  cssStyle={partnerCreateModalCss.inputSection}
                >
                  <TextInput
                    aria-label="password"
                    type="password"
                    rightIcon={<Lock size={14} color="#c2c4c8" />}
                    {...(partnerInfo
                      ? updateForm.register("password")
                      : register("password"))}
                  />
                  {(errors.password ||
                    updateForm.formState.errors.password) && (
                    <ErrorMessage isRelative={true}>
                      {t(
                        errors.password?.message ??
                          updateForm.formState.errors.password?.message ??
                          ""
                      )}
                    </ErrorMessage>
                  )}
                </InputSection>
                <InputSection
                  heading="h3"
                  headingText={t("profile.confirmPassword")}
                  gridType="col"
                  cssStyle={partnerCreateModalCss.inputSection}
                >
                  <TextInput
                    aria-label="rePassword"
                    type="password"
                    rightIcon={<Lock size={14} color="#c2c4c8" />}
                    {...(partnerInfo
                      ? updateForm.register("rePassword")
                      : register("rePassword"))}
                  />
                  {(errors.rePassword ||
                    updateForm.formState.errors.rePassword) && (
                    <ErrorMessage isRelative={true}>
                      {t(
                        errors.rePassword?.message ??
                          updateForm.formState.errors.rePassword?.message ??
                          ""
                      )}
                    </ErrorMessage>
                  )}
                </InputSection>
                {(errors.password ||
                  errors.rePassword ||
                  updateForm.formState.errors.password ||
                  updateForm.formState.errors.rePassword) && (
                  <span css={partnerCreateModalCss.passwordInfo}>
                    {t("profile.passwordMessage")}
                  </span>
                )}
              </div>
              <div css={partnerCreateModalCss.gridWrapper(2)}>
                <InputSection
                  heading="h3"
                  headingText={`${t("fee.exchangeFee")}(%)`}
                  gridType="col"
                  cssStyle={partnerCreateModalCss.inputSection}
                >
                  <TextInput
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    rightIcon={<Percent size={14} color="#c2c4c8" />}
                    cssStyle={partnerCreateModalCss.numberInput}
                    {...(partnerInfo
                      ? updateForm.register("feeRate", {
                          valueAsNumber: true,
                        })
                      : register("feeRate", {
                          valueAsNumber: true,
                        }))}
                  />
                  {(errors.feeRate || updateForm.formState.errors.feeRate) && (
                    <ErrorMessage isRelative={true}>
                      {t(
                        errors.feeRate?.message ??
                          updateForm.formState.errors.feeRate?.message ??
                          ""
                      )}
                    </ErrorMessage>
                  )}
                </InputSection>
                <InputSection
                  heading="h3"
                  headingText={`${t("fee.transactionFee")}(%)`}
                  gridType="col"
                  cssStyle={partnerCreateModalCss.inputSection}
                >
                  <TextInput
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    rightIcon={<Percent size={14} color="#c2c4c8" />}
                    cssStyle={partnerCreateModalCss.numberInput}
                    {...(partnerInfo
                      ? updateForm.register("txFeeRate", {
                          valueAsNumber: true,
                        })
                      : register("txFeeRate", {
                          valueAsNumber: true,
                        }))}
                  />
                  {(errors.txFeeRate || updateForm.formState.errors.txFeeRate) && (
                    <ErrorMessage isRelative={true}>
                      {t(
                        errors.txFeeRate?.message ??
                          updateForm.formState.errors.txFeeRate?.message ??
                          ""
                      )}
                    </ErrorMessage>
                  )}
                </InputSection>
              </div>
            </div>
            <div css={partnerCreateModalCss.buttonWrapper}>
              <Button buttonType="primary">
                {t("save")}
                <span>{`(${t("update")})`}</span>
              </Button>
              <Button
                type="button"
                buttonType="grayLine"
                onClick={handleCloseModal}
              >
                {t("cancel")}
              </Button>
            </div>
          </form>
        </div>
      </section>
      {isConfirmModalOpen && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          title={t("partner.secondPasswordSettingTitle")}
          message={t("partner.secondPasswordSettingMessage")}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={() => setIsConfirmModalOpen(false)}
        />
      )}
      {isExitModalOpen && (
        <ConfirmModal
          isOpen={isExitModalOpen}
          title={t("partner.exitTitle")}
          message={t("partner.exitMessage")}
          onClose={handleConfirmClose}
          onConfirm={handleAllClose}
        />
      )}
    </Modal>
  );
};

export default PartnerCreateModal;
