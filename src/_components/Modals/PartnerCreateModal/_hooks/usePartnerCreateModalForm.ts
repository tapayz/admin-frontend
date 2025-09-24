import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  partnerCreateModalUserSchema,
  PartnerCreateModalUserSchema,
  PartnerInfoUpdateSchema,
  partnerInfoUpdateSchema,
} from "../_schemas/partnerCreate.schema";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { PartnerCreateDto } from "../_dtos/partnerCreate.dto";
import { usePartnerCreate } from "./react-query/usePartnerCreate";
import { usePartnerInfoUpdateMutation } from "./react-query/usePartnerInfoUpdateMutation";
import { useLocale } from "@/_hooks/useLocale";
import { GetAgencyInfoResponse } from "@/_commomActions/agencyInfo/_dtos/getAgencyInfoResponse.dto";

interface UsePartnerCreateModalFormProps {
  data: GetAgencyInfoResponse | null | undefined;
  onSuccess?: () => void;
}

export const usePartnerCreateModalForm = ({
  data,
  onSuccess,
}: UsePartnerCreateModalFormProps) => {
  const { mutate: createPartner } = usePartnerCreate(onSuccess);
  const { t } = useLocale();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    watch,
    setValue,
  } = useForm<PartnerCreateModalUserSchema>({
    resolver: zodResolver(partnerCreateModalUserSchema),
    defaultValues: {
      id: "",
      name: "",
      password: "",
      rePassword: "",
      feeRate: 0,
      txFeeRate: 0,
    },
  });

  const updateForm = useForm<PartnerInfoUpdateSchema>({
    resolver: zodResolver(partnerInfoUpdateSchema),
    defaultValues: {
      password: "",
      rePassword: "",
      name: "",
      callback: "",
      feeRate: 0,
      txFeeRate: 0,
      bitAddress: "",
      ethAddress: "",
      trxAddress: "",
    },
  });
  const { mutate: updatePartnerInfo } = usePartnerInfoUpdateMutation(onSuccess);

  /**
   * 폼 제출 시 실행되는 함수
   * @param {PartnerCreateModalUserSchema} formData - 폼 데이터
   */
  const onPartnerSubmit = (formData: PartnerCreateModalUserSchema) => {
    if (!data) {
      if (watch("password") !== watch("rePassword")) {
        toast.error(t('validation.password.mismatch'));
        return;
      }

      const createPartnerData: PartnerCreateDto = {
        id: formData.id,
        name: formData.name,
        password: formData.password,
        rePassword: formData.rePassword,
        feeRate: formData.feeRate,
        txFeeRate: formData.txFeeRate,
      };

      createPartner(createPartnerData);
    }
  };

  const onPartnerInfoSubmit = (formData: PartnerInfoUpdateSchema) => {
    const updateData = {
      password: formData.password === "" ? undefined : formData.password,
      name: formData.name === "" ? undefined : formData.name,
      callback: formData.callback === "" ? undefined : formData.callback,
      feeRate: formData.feeRate,
      txFeeRate: formData.txFeeRate,
      bitAddress: formData.bitAddress === "" ? undefined : formData.bitAddress,
      ethAddress: formData.ethAddress === "" ? undefined : formData.ethAddress,
      trxAddress: formData.trxAddress === "" ? undefined : formData.trxAddress,
    };
    updatePartnerInfo({ partnerId: data?.agent.id ?? 0, data: updateData });
  };

  return {
    register,
    errors,
    onPartnerSubmit: handleSubmit(onPartnerSubmit),
    isDirty,
    control,
    onPartnerInfoSubmit: updateForm.handleSubmit(onPartnerInfoSubmit),
    watch,
    updateForm,
  };
};
