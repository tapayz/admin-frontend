import React from "react";
import ReactModal from "react-modal";
import { BaseModalProps } from "../_types/BaseModal.type";
import Button from "@/_components/Button/Button";
import { confirmModalCss } from "./ConfirmModal.styles";
import { overlayDimStyle } from "../_styles/modalOverlay.styles";
import { useLocale } from "@/_hooks/useLocale";

interface ConfirmModalProps extends BaseModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
}

const Modal = ReactModal as any;

const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
}: ConfirmModalProps) => {
  const { t } = useLocale();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={150}
      style={{
        overlay: overlayDimStyle,
      }}
      css={confirmModalCss.modal}
      ariaHideApp={false}
    >
      <div css={confirmModalCss.wrapper}>
        <h2 css={confirmModalCss.title}>{title}</h2>
        <p css={confirmModalCss.message}>{message}</p>
        <div css={confirmModalCss.buttonWrapper}>
          <Button buttonType="linePrimary" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button buttonType="primary" onClick={onConfirm}>
            {t("confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
