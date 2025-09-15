import ReactModal from "react-modal";
import type { BaseModalProps } from "../_types/BaseModal.type";
import Button from "@/_components/Button/Button";
import { invoiceDetailModalCss } from "./InvoiceDetailModal.styles";
import { overlayDimStyle } from "../_styles/modalOverlay.styles";
import { useLocale } from "@/_hooks/useLocale";
import InputSection from "@/_components/InputSection/InputSection";
import { useInvoiceDetailQuery } from "@/_layouts/invoice/_hooks/react-query/useInvoiceDetailQuery";
import Loader from "@/_components/SectionLoader/SectionLoader";
import dayjs from "dayjs";
import Badge from "@/_components/Badge/Badge";

export interface InvoiceDetailModalProps extends BaseModalProps {
  id: string;
}
const Modal = ReactModal as any;

export default function InvoiceDetailModal({
  //
  isOpen,
  onClose,
}: InvoiceDetailModalProps) {
  const { t } = useLocale();
  const { data: invoiceDetail, isLoading } = useInvoiceDetailQuery();

  if (isLoading) return <Loader />;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={150}
      style={{
        overlay: overlayDimStyle,
      }}
      css={invoiceDetailModalCss.modal}
      className="custom-scrollbar"
      ariaHideApp={false}
    >
      <div css={invoiceDetailModalCss.wrapper}>
        <strong css={invoiceDetailModalCss.title}>
          {t("invoice.detail.title")}
        </strong>

        <div css={invoiceDetailModalCss.content}>
          <section css={invoiceDetailModalCss.section}>
            <h2 css={invoiceDetailModalCss.sectionTitle}>
              {t("invoice.detail.section.basicInfo")}
            </h2>
            <div css={invoiceDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.id")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>{invoiceDetail?.id}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.state")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <Badge
                  type={
                    invoiceDetail?.state === "Pending"
                      ? "infoDefault"
                      : invoiceDetail?.state === "Cancel"
                      ? "infoDanger"
                      : "infoSuccess"
                  }
                  cssStyle={invoiceDetailModalCss.badge}
                >
                  {invoiceDetail?.state}
                </Badge>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.title.field")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>{invoiceDetail?.title}</span>
              </InputSection>
            </div>
          </section>

          <section css={invoiceDetailModalCss.section}>
            <h2 css={invoiceDetailModalCss.sectionTitle}>
              {t("invoice.detail.partner")}
            </h2>
            <div css={invoiceDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.partner.name")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>{invoiceDetail?.partner?.name}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.partner.id")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>{invoiceDetail?.partner?.id}</span>
              </InputSection>
            </div>
          </section>

          <section css={invoiceDetailModalCss.section}>
            <h2 css={invoiceDetailModalCss.sectionTitle}>
              {t("invoice.detail.customer")}
            </h2>
            <div css={invoiceDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.customer.name")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>{invoiceDetail?.customer?.name}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.customer.id")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>{invoiceDetail?.customer?.id}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.customer.icon")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>{invoiceDetail?.customer?.icon}</span>
              </InputSection>
            </div>
          </section>

          <section css={invoiceDetailModalCss.section}>
            <h2 css={invoiceDetailModalCss.sectionTitle}>
              {t("invoice.detail.section.paymentInfo")}
            </h2>
            <div css={invoiceDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.stdPrice")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>
                  {Number(invoiceDetail?.stdPrice)?.toLocaleString("ko-KR", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 20,
                  })}
                </span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.cashAmount")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>
                  {Number(invoiceDetail?.cashAmount).toLocaleString()}
                </span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.cryptoAmount")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>
                  {Number(invoiceDetail?.cryptoAmount)?.toLocaleString(
                    "ko-KR",
                    { minimumFractionDigits: 0, maximumFractionDigits: 20 }
                  )}
                </span>
              </InputSection>
            </div>
          </section>

          <section css={invoiceDetailModalCss.section}>
            <h2 css={invoiceDetailModalCss.sectionTitle}>
              {t("invoice.detail.wallet")}
            </h2>
            <div css={invoiceDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.wallet.address")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>{invoiceDetail?.wallet?.address}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.wallet.network")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>{invoiceDetail?.wallet?.network}</span>
              </InputSection>
            </div>
          </section>

          <section css={invoiceDetailModalCss.section}>
            <h2 css={invoiceDetailModalCss.sectionTitle}>
              {t("invoice.detail.section.scheduleInfo")}
            </h2>
            <div css={invoiceDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.expiredAt")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>
                  {dayjs(invoiceDetail?.expiredAt).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("invoice.detail.createdAt")}
                cssStyle={invoiceDetailModalCss.inputSection}
              >
                <span>
                  {dayjs(invoiceDetail?.createdAt).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </span>
              </InputSection>
            </div>
          </section>
        </div>
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
