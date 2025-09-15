import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PartnerCreateDto } from "../../_dtos/partnerCreate.dto";
import { createPartner } from "../../_actions/createPartner";
import toast from "react-hot-toast";
import { useCreateModalStore } from "../../_store/useCreateModalStore";
import { hierarchyInfoQueryOptions } from "@/_components/HierachyInfoSection/_hooks/react-query/useHierarchyInfoQuery";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { useLocale } from "@/_hooks/useLocale";
import { partnerListOptions } from "@/_layouts/partner/_hooks/react-query/usePartnerListQuery";
import { useFilter } from "@/_hooks/useFilter";

export const usePartnerCreate = () => {
  const { setIsModalOpen, setIsExitModalOpen } = useCreateModalStore();
  const params = useSearchParams();
  const targetAgentId = params.get("targetAgentId") || undefined;
  const queryClient = useQueryClient();
  const { t } = useLocale();
  const hierachyInfoOption = hierarchyInfoQueryOptions({
    targetAgentId: targetAgentId,
  });
  const { page, limit } = useFilter();

  return useMutation({
    mutationFn: (data: PartnerCreateDto) => createPartner(data),
    onSuccess: (response) => {
      console.log("Partner create success:", response);
      toast.success(t("partner.create.success"));
      setIsModalOpen(false);
      setIsExitModalOpen(false);
      queryClient.invalidateQueries({ queryKey: hierachyInfoOption.queryKey });
      queryClient.invalidateQueries({
        queryKey: partnerListOptions({ page, limit }).queryKey,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Partner create error:", error);
      toast.error(error.response?.data.message ?? "Failed to create partner");
    },
  });
};
