import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memberNameEditSchema, type MemberNameEditSchema } from "../_schemas/memberForms.schema";
import { useEditMemberNameMutation } from "./react-query/useEditMemberNameMutation";
import { useLocale } from "@/_hooks/useLocale";
import toast from "react-hot-toast";

interface UseMemberNameEditFormProps {
  targetId: number;
  initialName?: string;
  onSuccess?: () => void;
}

export const useMemberNameEditForm = ({ 
  targetId, 
  initialName = "",
  onSuccess 
}: UseMemberNameEditFormProps) => {
  const { t } = useLocale();
  const editMemberNameMutation = useEditMemberNameMutation();

  const form = useForm<MemberNameEditSchema>({
    resolver: zodResolver(memberNameEditSchema),
    defaultValues: {
      targetId,
      name: initialName,
    },
  });

  const onSubmit = (data: MemberNameEditSchema) => {
    if (data.name.trim() === initialName.trim()) {
      toast(t("member.noChangesMessage"));
      return;
    }

    editMemberNameMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  const resetForm = () => {
    form.reset({ targetId, name: initialName });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    resetForm,
    isSubmitting: editMemberNameMutation.isPending,
    errors: form.formState.errors,
    register: form.register,
    watch: form.watch,
    setValue: form.setValue,
  };
};