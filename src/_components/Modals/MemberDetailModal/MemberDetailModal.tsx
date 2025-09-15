import ReactModal from "react-modal";
import type { BaseModalProps } from "../_types/BaseModal.type";
import Button from "@/_components/Button/Button";
import { memberDetailModalCss } from "./MemberDetailModal.styles";
import { overlayDimStyle } from "../_styles/modalOverlay.styles";
import { useLocale } from "@/_hooks/useLocale";
import InputSection from "@/_components/InputSection/InputSection";
import TextInput from "@/_components/TextInput/TextInput";
import { useMemberDetailQuery } from "@/_layouts/members/_hooks/react-query/useMemberDetailQuery";
import type {
  MemberDetailMemoDto,
  MemberDetailContactDto,
} from "@/_layouts/members/_dtos/getMemberDetailResponse.dto";
import { ContactType } from "@/_layouts/members/_dtos/customerResponse.dto";
import { useMemberNameEditForm } from "@/_layouts/members/_hooks/useMemberNameEditForm";
import {
  useMemberMemoAddForm,
  useMemberMemoEditForm,
  useMemberMemoDelete,
} from "@/_layouts/members/_hooks/useMemberMemoForms";
import {
  useMemberContactAddForm,
  useMemberContactEditForm,
  useMemberContactDelete,
} from "@/_layouts/members/_hooks/useMemberContactForms";
import { useMemberIconUploadForm } from "@/_layouts/members/_hooks/useMemberIconUploadForm";
import Loader from "@/_components/SectionLoader/SectionLoader";
import dayjs from "dayjs";
import Badge from "@/_components/Badge/Badge";
import ErrorMessage from "@/_components/ErrorMessage/ErrorMessage";
import { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import Select from "@/_components/Select/Select";
import type { SelectOption } from "@/_components/Select/types/select.types";

export interface MemberDetailModalProps extends BaseModalProps {
  id: string;
}
const Modal = ReactModal;

export default function MemberDetailModal({
  isOpen,
  onClose,
  id,
}: MemberDetailModalProps) {
  const { t } = useLocale();
  const { data: memberDetail, isLoading } = useMemberDetailQuery();
  const [editingMemoId, setEditingMemoId] = useState<number | null>(null);
  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [showAddMemo, setShowAddMemo] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contactTypeOptions: SelectOption<string>[] = [
    { label: t("member.contact.type.phone"), value: ContactType.PHONE },
    { label: t("member.contact.type.email"), value: ContactType.EMAIL },
  ];

  const nameEditForm = useMemberNameEditForm({
    targetId: parseInt(id),
    initialName: memberDetail?.customer?.name || "",
  });

  const addMemoForm = useMemberMemoAddForm({
    targetId: parseInt(id),
    onSuccess: () => setShowAddMemo(false),
  });

  const editMemoForm = useMemberMemoEditForm({
    targetId: parseInt(id),
    memoId: editingMemoId || 0,
    initialMemo: "",
    onSuccess: () => setEditingMemoId(null),
  });

  const { deleteMemo, isDeleting: isDeletingMemo } = useMemberMemoDelete();

  const addContactForm = useMemberContactAddForm({
    targetId: parseInt(id),
    onSuccess: () => setShowAddContact(false),
  });

  const editContactForm = useMemberContactEditForm({
    targetId: parseInt(id),
    contactId: editingContactId || 0,
    onSuccess: () => setEditingContactId(null),
  });

  const { deleteContact, isDeleting: isDeletingContact } =
    useMemberContactDelete();

  const iconUploadForm = useMemberIconUploadForm({
    targetId: parseInt(id),
  });

  if (isLoading) return <Loader />;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={150}
      style={{
        overlay: overlayDimStyle,
      }}
      css={memberDetailModalCss.modal}
      className="custom-scrollbar"
      ariaHideApp={false}
    >
      <div css={memberDetailModalCss.wrapper}>
        <strong css={memberDetailModalCss.title}>
          {t("member.detail.title")}
        </strong>

        <div css={memberDetailModalCss.content}>
          <section css={memberDetailModalCss.section}>
            <h2 css={memberDetailModalCss.sectionTitle}>
              {t("member.detail.customer")}
            </h2>
            <div css={memberDetailModalCss.inputSectionWrapper}>
              <form onSubmit={nameEditForm.onSubmit}>
                <InputSection
                  heading="h3"
                  headingText={t("member.detail.customer.name")}
                  cssStyle={memberDetailModalCss.inputSection}
                >
                  <div
                    css={{ display: "flex", gap: "8px", alignItems: "center" }}
                  >
                    <TextInput
                      {...nameEditForm.register("name")}
                      placeholder={t("member.detail.customer.name")}
                    />
                    <Button
                      type="submit"
                      buttonType="primary"
                      disabled={nameEditForm.isSubmitting}
                      css={{ minWidth: "60px" }}
                    >
                      {t("save")}
                    </Button>
                  </div>
                  {nameEditForm.errors.name && (
                    <ErrorMessage isRelative={true}>
                      {t(nameEditForm.errors.name.message ?? "")}
                    </ErrorMessage>
                  )}
                </InputSection>
              </form>

              <InputSection
                heading="h3"
                headingText={t("member.detail.customer.id")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.customer?.id}</span>
              </InputSection>

              <InputSection
                heading="h3"
                headingText={t("member.detail.customer.icon")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <div
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {/* 기존 이미지 또는 미리보기 이미지 표시 */}
                  {(memberDetail?.customer?.icon || iconUploadForm.previewUrl) && (
                    <img
                      src={iconUploadForm.previewUrl || memberDetail?.customer?.icon}
                      alt="Customer Icon"
                      css={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                      }}
                    />
                  )}
                  
                  <div css={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        iconUploadForm.handleFileChange(
                          e.target.files?.[0] || null
                        )
                      }
                      css={{ display: "none" }}
                    />
                    
                    <div css={{ display: "flex", gap: "8px" }}>
                      {iconUploadForm.previewUrl ? (
                        <form onSubmit={iconUploadForm.onSubmit} css={{ display: "flex", gap: "8px" }}>
                          <Button
                            type="submit"
                            buttonType="primary"
                            disabled={iconUploadForm.isSubmitting}
                            css={{ minWidth: "80px" }}
                          >
                            {t("upload")}
                          </Button>
                          <Button
                            type="button"
                            buttonType="grayLine"
                            onClick={iconUploadForm.clearFile}
                          >
                            {t("cancel")}
                          </Button>
                        </form>
                      ) : (
                        <Button
                          type="button"
                          buttonType="primary"
                          onClick={() => fileInputRef.current?.click()}
                          css={{ minWidth: "80px" }}
                        >
                          {memberDetail?.customer?.icon ? t("member.icon.change") : t("member.icon.upload")}
                        </Button>
                      )}
                    </div>
                    
                    {iconUploadForm.errors.file && (
                      <ErrorMessage isRelative={true}>
                        {t(iconUploadForm.errors.file.message ?? "")}
                      </ErrorMessage>
                    )}
                  </div>
                </div>
              </InputSection>
            </div>
          </section>
          <section css={memberDetailModalCss.section}>
            <h2 css={memberDetailModalCss.sectionTitle}>
              {t("member.detail.partner")}
            </h2>
            <div css={memberDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("member.detail.partner.name")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.partner?.name}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("member.detail.partner.id")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.partner?.id}</span>
              </InputSection>
            </div>
          </section>
          <section css={memberDetailModalCss.section}>
            <h2 css={memberDetailModalCss.sectionTitle}>
              {t("member.detail.section.paymentInfo")}
            </h2>
            <div css={memberDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("member.detail.stdPrice")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.stdPrice}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("member.detail.cashAmount")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.cashAmount}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("member.detail.cryptoAmount")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.cryptoAmount}</span>
              </InputSection>
            </div>
          </section>

          <section css={memberDetailModalCss.section}>
            <h2 css={memberDetailModalCss.sectionTitle}>
              {t("member.detail.wallet")}
            </h2>
            <div css={memberDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("member.detail.wallet.address")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.wallet?.address}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("member.detail.wallet.network")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.wallet?.network}</span>
              </InputSection>
            </div>
          </section>

          <section css={memberDetailModalCss.section}>
            <h2 css={memberDetailModalCss.sectionTitle}>
              {t("member.detail.addresses")}
            </h2>
            <div css={memberDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("member.bitAddress")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.bitAddress || t("wallet.notSet")}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("member.ethAddress")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.ethAddress || t("wallet.notSet")}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("member.trxAddress")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.trxAddress || t("wallet.notSet")}</span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("member.callback")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>{memberDetail?.callback || t("wallet.notSet")}</span>
              </InputSection>
            </div>
          </section>

          <section css={memberDetailModalCss.section}>
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h2 css={memberDetailModalCss.sectionTitle}>
                {t("member.memo")}
              </h2>
              <Button
                type="button"
                buttonType="primary"
                onClick={() => setShowAddMemo(true)}
                disabled={showAddMemo}
              >
                {t("member.memo.add")}
              </Button>
            </div>

            {showAddMemo && (
              <form
                onSubmit={addMemoForm.onSubmit}
                css={{ marginBottom: "16px" }}
              >
                <div
                  css={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <TextInput
                    {...addMemoForm.register("memo")}
                    placeholder={t("member.memo.placeholder")}
                    css={{ flex: 1 }}
                  />
                  <Button
                    type="submit"
                    buttonType="primary"
                    disabled={addMemoForm.isSubmitting}
                  >
                    {t("common.add")}
                  </Button>
                  <Button
                    type="button"
                    buttonType="grayLine"
                    onClick={() => {
                      setShowAddMemo(false);
                      addMemoForm.resetForm();
                    }}
                  >
                    {t("cancel")}
                  </Button>
                </div>
                {addMemoForm.errors.memo && (
                  <ErrorMessage isRelative={true}>
                    {t(addMemoForm.errors.memo.message ?? "")}
                  </ErrorMessage>
                )}
              </form>
            )}

            <div css={memberDetailModalCss.inputSectionWrapper}>
              {memberDetail?.memos?.map((memo: MemberDetailMemoDto) => (
                <div
                  key={memo.id}
                  css={{
                    borderBottom: "1px solid #eee",
                    paddingBottom: "8px",
                    marginBottom: "8px",
                  }}
                >
                  {editingMemoId === memo.id ? (
                    <form onSubmit={editMemoForm.onSubmit}>
                      <div
                        css={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "flex-start",
                        }}
                      >
                        <TextInput
                          {...editMemoForm.register("memo")}
                          defaultValue={memo.content}
                          css={{ flex: 1 }}
                        />
                        <Button
                          type="submit"
                          buttonType="primary"
                          disabled={editMemoForm.isSubmitting}
                        >
                          {t("save")}
                        </Button>
                        <Button
                          type="button"
                          buttonType="grayLine"
                          onClick={() => setEditingMemoId(null)}
                        >
                          {t("cancel")}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{memo.content}</span>
                      <div css={{ display: "flex", gap: "4px" }}>
                        <Button
                          type="button"
                          buttonType="grayLine"
                          onClick={() => setEditingMemoId(memo.id)}
                          css={{ padding: "4px 8px", fontSize: "12px" }}
                        >
                          {t("common.edit")}
                        </Button>
                        <Button
                          type="button"
                          buttonType="dangerLine"
                          onClick={() => deleteMemo(parseInt(id), memo.id)}
                          disabled={isDeletingMemo}
                          css={{ padding: "4px 8px", fontSize: "12px" }}
                        >
                          {t("common.delete")}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section css={memberDetailModalCss.section}>
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h2 css={memberDetailModalCss.sectionTitle}>
                {t("member.contact")}
              </h2>
              <Button
                type="button"
                buttonType="primary"
                onClick={() => setShowAddContact(true)}
                disabled={showAddContact}
              >
                {t("member.contact.add")}
              </Button>
            </div>

            {showAddContact && (
              <form
                onSubmit={addContactForm.onSubmit}
                css={{ marginBottom: "16px" }}
              >
                <div
                  css={{ display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  <div css={{ display: "flex", gap: "8px" }}>
                    <Controller
                      name="type"
                      control={addContactForm.form.control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={contactTypeOptions}
                          value={contactTypeOptions.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption?.value)
                          }
                          css={{ minWidth: "120px" }}
                        />
                      )}
                    />
                    <TextInput
                      {...addContactForm.register("value")}
                      type={
                        addContactForm.watch("type") === ContactType.EMAIL
                          ? "email"
                          : "text"
                      }
                      placeholder={t("member.contact.placeholder")}
                      css={{ flex: 1 }}
                    />
                  </div>
                  <TextInput
                    {...addContactForm.register("desc")}
                    placeholder={t("member.contact.desc.placeholder")}
                  />
                  <div css={{ display: "flex", gap: "8px" }}>
                    <Button
                      type="submit"
                      buttonType="primary"
                      disabled={addContactForm.isSubmitting}
                    >
                      {t("common.add")}
                    </Button>
                    <Button
                      type="button"
                      buttonType="grayLine"
                      onClick={() => {
                        setShowAddContact(false);
                        addContactForm.resetForm();
                      }}
                    >
                      {t("cancel")}
                    </Button>
                  </div>
                </div>
                {(addContactForm.errors.value ||
                  addContactForm.errors.desc) && (
                  <div>
                    {addContactForm.errors.value && (
                      <ErrorMessage isRelative={true}>
                        {t(addContactForm.errors.value.message ?? "")}
                      </ErrorMessage>
                    )}
                    {addContactForm.errors.desc && (
                      <ErrorMessage isRelative={true}>
                        {t(addContactForm.errors.desc.message ?? "")}
                      </ErrorMessage>
                    )}
                  </div>
                )}
              </form>
            )}

            <div css={memberDetailModalCss.inputSectionWrapper}>
              {memberDetail?.contacts?.map(
                (contact: MemberDetailContactDto) => (
                  <div
                    key={contact.id}
                    css={{
                      borderBottom: "1px solid #eee",
                      paddingBottom: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {editingContactId === contact.id ? (
                      <form onSubmit={editContactForm.onSubmit}>
                        <div
                          css={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <div css={{ display: "flex", gap: "8px" }}>
                            <span
                              css={{
                                padding: "8px",
                                backgroundColor: "#f5f5f5",
                                borderRadius: "4px",
                                minWidth: "60px",
                                textAlign: "center",
                              }}
                            >
                              {contact.type.toString()}
                            </span>
                            <TextInput
                              {...editContactForm.register("value")}
                              type={contact.type === ContactType.EMAIL ? "email" : "text"}
                              defaultValue={contact.value}
                              css={{ flex: 1 }}
                            />
                          </div>
                          <TextInput
                            {...editContactForm.register("desc")}
                            defaultValue={contact.desc}
                          />
                          <div css={{ display: "flex", gap: "8px" }}>
                            <Button
                              type="submit"
                              buttonType="primary"
                              disabled={editContactForm.isSubmitting}
                            >
                              {t("save")}
                            </Button>
                            <Button
                              type="button"
                              buttonType="grayLine"
                              onClick={() => setEditingContactId(null)}
                            >
                              {t("cancel")}
                            </Button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <div
                          css={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "4px",
                          }}
                        >
                          <div
                            css={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            <span
                              css={{
                                fontSize: "12px",
                                backgroundColor: "#f0f0f0",
                                padding: "2px 6px",
                                borderRadius: "3px",
                              }}
                            >
                              {contact.type.toString()}
                            </span>
                            <span>{contact.value}</span>
                          </div>
                          <div css={{ display: "flex", gap: "4px" }}>
                            <Button
                              type="button"
                              buttonType="grayLine"
                              onClick={() => setEditingContactId(contact.id)}
                              css={{ padding: "4px 8px", fontSize: "12px" }}
                            >
                              {t("common.edit")}
                            </Button>
                            <Button
                              type="button"
                              buttonType="dangerLine"
                              onClick={() =>
                                deleteContact(parseInt(id), contact.id)
                              }
                              disabled={isDeletingContact}
                              css={{ padding: "4px 8px", fontSize: "12px" }}
                            >
                              {t("common.delete")}
                            </Button>
                          </div>
                        </div>
                        <div css={{ fontSize: "12px", color: "#666" }}>
                          {contact.desc}
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </section>

          <section css={memberDetailModalCss.section}>
            <h2 css={memberDetailModalCss.sectionTitle}>
              {t("member.detail.section.scheduleInfo")}
            </h2>
            <div css={memberDetailModalCss.inputSectionWrapper}>
              <InputSection
                heading="h3"
                headingText={t("member.detail.expiredAt")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>
                  {dayjs(memberDetail?.expiredAt).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </InputSection>
              <InputSection
                heading="h3"
                headingText={t("member.detail.createdAt")}
                cssStyle={memberDetailModalCss.inputSection}
              >
                <span>
                  {dayjs(memberDetail?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
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
