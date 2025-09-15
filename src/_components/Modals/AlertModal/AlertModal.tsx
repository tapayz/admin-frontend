import ReactModal from "react-modal";
import type { BaseModalProps } from "../_types/BaseModal.type";
import Button from "@/_components/Button/Button";
import { alertModalCss } from "./AlertModal.styles";
import { overlayDimStyle } from "../_styles/modalOverlay.styles";
import { useLocale } from "@/_hooks/useLocale";

export interface AlertModalProps extends BaseModalProps {
  title: string;
  content: React.ReactNode;
}
const Modal = ReactModal as any;

export default function AlertModal({
  //
  isOpen,
  title,
  content,
  onClose,
}: AlertModalProps) {
  const { t } = useLocale();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={150}
      style={{
        overlay: overlayDimStyle,
      }}
      css={alertModalCss.modal}
      ariaHideApp={false}
    >
      <div css={alertModalCss.wrapper}>
        <strong css={alertModalCss.title}>{title}</strong>

        <div css={alertModalCss.content}>{content}</div>
        <Button
          buttonType="primary"
          onClick={onClose}
          cssStyle={{ width: "100%" }}
        >
          <span>{t("confirm")}</span>
        </Button>
      </div>
    </Modal>
  );
}
