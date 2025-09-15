import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  memberContactSchema, 
  memberContactEditSchema,
  contactTypeEnum,
  type MemberContactSchema,
  type MemberContactEditSchema,
} from "../_schemas/memberForms.schema";
import { ContactType } from "../_dtos/customerResponse.dto";
import { useAddMemberContactMutation } from "./react-query/useAddMemberContactMutation";
import { useEditMemberContactMutation } from "./react-query/useEditMemberContactMutation";
import { useDeleteMemberContactMutation } from "./react-query/useDeleteMemberContactMutation";

interface UseMemberContactAddFormProps {
  targetId: number;
  onSuccess?: () => void;
}

interface UseMemberContactEditFormProps {
  targetId: number;
  contactId: number;
  initialValue?: string;
  initialDesc?: string;
  onSuccess?: () => void;
}

export const useMemberContactAddForm = ({ 
  targetId,
  onSuccess 
}: UseMemberContactAddFormProps) => {
  const addMemberContactMutation = useAddMemberContactMutation();

  const form = useForm<MemberContactSchema>({
    resolver: zodResolver(memberContactSchema),
    defaultValues: {
      targetId,
      type: ContactType.PHONE,
      value: "",
      desc: "",
    },
  });

  const onSubmit = (data: MemberContactSchema) => {
    addMemberContactMutation.mutate(data, {
      onSuccess: () => {
        form.reset({
          targetId,
          type: ContactType.PHONE,
          value: "",
          desc: "",
        });
        onSuccess?.();
      },
    });
  };

  const resetForm = () => {
    form.reset({
      targetId,
      type: ContactType.PHONE,
      value: "",
      desc: "",
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    resetForm,
    isSubmitting: addMemberContactMutation.isPending,
    errors: form.formState.errors,
    register: form.register,
    watch: form.watch,
    setValue: form.setValue,
    contactTypes: contactTypeEnum.options,
  };
};

export const useMemberContactEditForm = ({ 
  targetId,
  contactId,
  initialValue = "",
  initialDesc = "",
  onSuccess 
}: UseMemberContactEditFormProps) => {
  const editMemberContactMutation = useEditMemberContactMutation();

  const form = useForm<MemberContactEditSchema>({
    resolver: zodResolver(memberContactEditSchema),
    defaultValues: {
      targetId,
      contactId,
      value: initialValue,
      desc: initialDesc,
    },
  });

  const onSubmit = (data: MemberContactEditSchema) => {
    if (data.value.trim() === initialValue.trim() && 
        data.desc.trim() === initialDesc.trim()) {
      return;
    }

    editMemberContactMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  const resetForm = () => {
    form.reset({
      targetId,
      contactId,
      value: initialValue,
      desc: initialDesc,
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    resetForm,
    isSubmitting: editMemberContactMutation.isPending,
    errors: form.formState.errors,
    register: form.register,
    watch: form.watch,
    setValue: form.setValue,
  };
};

export const useMemberContactDelete = () => {
  const deleteMemberContactMutation = useDeleteMemberContactMutation();

  const deleteContact = (targetId: number, contactId: number, onSuccess?: () => void) => {
    deleteMemberContactMutation.mutate({ targetId, contactId }, {
      onSuccess,
    });
  };

  return {
    deleteContact,
    isDeleting: deleteMemberContactMutation.isPending,
  };
};