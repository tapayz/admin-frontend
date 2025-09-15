import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  memberMemoSchema, 
  memberMemoEditSchema,
  type MemberMemoSchema,
  type MemberMemoEditSchema,
} from "../_schemas/memberForms.schema";
import { useAddMemberMemoMutation } from "./react-query/useAddMemberMemoMutation";
import { useEditMemberMemoMutation } from "./react-query/useEditMemberMemoMutation";
import { useDeleteMemberMemoMutation } from "./react-query/useDeleteMemberMemoMutation";

interface UseMemberMemoAddFormProps {
  targetId: number;
  onSuccess?: () => void;
}

interface UseMemberMemoEditFormProps {
  targetId: number;
  memoId: number;
  initialMemo?: string;
  onSuccess?: () => void;
}

export const useMemberMemoAddForm = ({ 
  targetId,
  onSuccess 
}: UseMemberMemoAddFormProps) => {
  const addMemberMemoMutation = useAddMemberMemoMutation();

  const form = useForm<MemberMemoSchema>({
    resolver: zodResolver(memberMemoSchema),
    defaultValues: {
      targetId,
      memo: "",
    },
  });

  const onSubmit = (data: MemberMemoSchema) => {
    addMemberMemoMutation.mutate(data, {
      onSuccess: () => {
        form.reset({ targetId, memo: "" });
        onSuccess?.();
      },
    });
  };

  const resetForm = () => {
    form.reset({ targetId, memo: "" });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    resetForm,
    isSubmitting: addMemberMemoMutation.isPending,
    errors: form.formState.errors,
    register: form.register,
    watch: form.watch,
    setValue: form.setValue,
  };
};

export const useMemberMemoEditForm = ({ 
  targetId,
  memoId,
  initialMemo = "",
  onSuccess 
}: UseMemberMemoEditFormProps) => {
  const editMemberMemoMutation = useEditMemberMemoMutation();

  const form = useForm<MemberMemoEditSchema>({
    resolver: zodResolver(memberMemoEditSchema),
    defaultValues: {
      targetId,
      memoId,
      memo: initialMemo,
    },
  });

  const onSubmit = (data: MemberMemoEditSchema) => {
    if (data.memo.trim() === initialMemo.trim()) {
      return;
    }

    editMemberMemoMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  const resetForm = () => {
    form.reset({ targetId, memoId, memo: initialMemo });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    resetForm,
    isSubmitting: editMemberMemoMutation.isPending,
    errors: form.formState.errors,
    register: form.register,
    watch: form.watch,
    setValue: form.setValue,
  };
};

export const useMemberMemoDelete = () => {
  const deleteMemberMemoMutation = useDeleteMemberMemoMutation();

  const deleteMemo = (targetId: number, memoId: number, onSuccess?: () => void) => {
    deleteMemberMemoMutation.mutate({ targetId, memoId }, {
      onSuccess,
    });
  };

  return {
    deleteMemo,
    isDeleting: deleteMemberMemoMutation.isPending,
  };
};