import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { editMemberName } from "../../_actions/editMemberName";
import { EditMemberNameDto } from "../../_dtos/editMemberName.dto";
import toast from "react-hot-toast";
import { memberListOptions } from "./useMemberListQuery";
import { memberDetailOptions } from "./useMemberDetailQuery";
import { useLocale } from "@/_hooks/useLocale";
import { useFilter } from "@/_hooks/useFilter";

export const useEditMemberNameMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLocale();
  const { searchType, search, sort, sortType, page, limit } = useFilter();

  return useMutation({
    mutationFn: (data: EditMemberNameDto) => editMemberName(data),
    onSuccess: (_, variables) => {
      toast.success(t("member.nameUpdateSuccess"));

      queryClient.invalidateQueries({
        queryKey: memberListOptions({
          page,
          size: limit,
          searchType: searchType as "name" | "email" | "phone" | "id" | "",
          search,
          sortBy: sort as "name" | "createdAt" | "updatedAt",
          sortOrder: sortType as "asc" | "desc",
        }).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: memberDetailOptions(variables.targetId.toString()).queryKey,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || t("member.nameUpdateFailed")
      );
    },
  });
};
