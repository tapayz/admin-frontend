import { useMutation } from "@tanstack/react-query";
import { CheckDuplicateRequestDto } from "../../_dtos/checkDupligateRequest.dto";
import { checkDuplicate } from "../../_actions/checkDupligate";
import toast from "react-hot-toast";
import { usePrefixStore } from "../../_store/useCheckDuplicateStore";
import { useLocale } from '@/_hooks/useLocale';

export const useCheckDuplicate = () => {
  const {
    setBeforePrefix,
    setIsPrefixCheck,
    setBeforeUsername,
    setIsUsernameCheck,
  } = usePrefixStore();
  const { t } = useLocale();
  return useMutation({
    mutationFn: ({ prefix, username }: CheckDuplicateRequestDto) =>
      checkDuplicate({ prefix, username }),
    onSuccess: (data) => {
      if (data) {
        toast.success(`${data.field.value} ${t('validation.duplicate.available')}`);
      } else {
        toast.error(t('validation.duplicate.checkFailed'));
      }

      if (data?.field?.label === "prefix") {
        setBeforePrefix(data.field.value);
        setIsPrefixCheck(true);
        return;
      }

      if (data?.field?.label === "username") {
        setBeforeUsername(data.field.value);
        setIsUsernameCheck(true);
        return;
      }
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
