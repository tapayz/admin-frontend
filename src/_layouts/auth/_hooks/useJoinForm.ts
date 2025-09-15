import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinSchema, JoinSchema } from "../_schemas/authForms.schema";
import { useJoinMutation } from "./react-query/useJoinMutation";
import { useCheckDuplicateStore } from "../_store/useCheckDuplicateStore";
import { useLocale } from "@/_hooks/useLocale";
import toast from "react-hot-toast";

export const useJoinForm = () => {
  const { mutate: joinMutate, isPending } = useJoinMutation();
  const { t } = useLocale();
  const { 
    isChecked, 
    isDuplicateAvailable, 
    checkedId,
    checkIfIdChanged 
  } = useCheckDuplicateStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JoinSchema>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      id: "",
      password: "",
      rePassword: "",
      name: "",
    },
  });

  const onSubmit = async (data: JoinSchema) => {
    if (checkIfIdChanged(data.id)) {
      toast.error(t("validation.id.changed"));
      return;
    }

    if (!isChecked || checkedId !== data.id) {
      toast.error(t("validation.id.notChecked"));
      return;
    }

    if (!isDuplicateAvailable) {
      toast.error(t("validation.id.notAvailable"));
      return;
    }

    joinMutate(data);
  };

  return { 
    register, 
    handleSubmit, 
    watch,
    errors, 
    isSubmitting: isSubmitting || isPending, 
    onSubmit,
    // 중복 확인 상태 노출
    isIdChecked: isChecked && checkedId === watch("id"),
    isDuplicateAvailable,
  };
};