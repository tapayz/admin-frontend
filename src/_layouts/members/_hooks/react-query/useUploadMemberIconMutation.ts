import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { uploadMemberIcon } from "../../_actions/uploadMemberIcon";
import { EditMemberIconDto } from "../../_dtos/editMemberIcon.dto";
import toast from "react-hot-toast";
import { memberListOptions } from "./useMemberListQuery";
import { memberDetailOptions } from "./useMemberDetailQuery";
import { useLocale } from "@/_hooks/useLocale";
import { useFilter } from "@/_hooks/useFilter";

interface UploadMemberIconParams {
  data: EditMemberIconDto;
  file: File;
}

export const useUploadMemberIconMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLocale();
  const { searchType, search, sort, sortType, page, limit } = useFilter();

  return useMutation({
    mutationFn: ({ data, file }: UploadMemberIconParams) =>
      uploadMemberIcon(data, file),
    onSuccess: (_, variables) => {
      toast.success(t("member.iconUploadSuccess"));

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
        queryKey: memberDetailOptions(variables.data.targetId.toString())
          .queryKey,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || t("member.iconUploadFailed")
      );
    },
  });
};
