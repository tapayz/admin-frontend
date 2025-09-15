import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  memberIconUploadSchema,
  type MemberIconUploadSchema,
} from "../_schemas/memberForms.schema";
import { useUploadMemberIconMutation } from "./react-query/useUploadMemberIconMutation";
import { useCallback, useState } from "react";

interface UseMemberIconUploadFormProps {
  targetId: number;
  onSuccess?: () => void;
}

export const useMemberIconUploadForm = ({ 
  targetId,
  onSuccess 
}: UseMemberIconUploadFormProps) => {
  const uploadMemberIconMutation = useUploadMemberIconMutation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<MemberIconUploadSchema>({
    resolver: zodResolver(memberIconUploadSchema),
    defaultValues: {
      targetId,
      file: null as any,
    },
  });

  const onSubmit = (data: MemberIconUploadSchema) => {
    if (!data.file) {
      form.setError("file", { type: "required", message: "파일을 선택해주세요" });
      return;
    }

    uploadMemberIconMutation.mutate(
      { data: { targetId }, file: data.file },
      {
        onSuccess: () => {
          form.reset({ targetId, file: null as any });
          setPreviewUrl(null);
          onSuccess?.();
        },
      }
    );
  };

  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      // Validate file
      const validation = memberIconUploadSchema.safeParse({ targetId, file });
      if (!validation.success) {
        form.setError("file", { 
          type: "manual", 
          message: validation.error.issues[0]?.message || "Invalid file"
        });
        return;
      }

      // Set file and create preview
      form.setValue("file", file);
      form.clearErrors("file");
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("file", null as any);
      form.clearErrors("file");
      setPreviewUrl(null);
    }
  }, [form, targetId]);

  const clearFile = useCallback(() => {
    form.setValue("file", null as any);
    form.clearErrors("file");
    setPreviewUrl(null);
  }, [form]);

  const resetForm = () => {
    form.reset({ targetId, file: null as any });
    setPreviewUrl(null);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleFileChange,
    clearFile,
    resetForm,
    previewUrl,
    isSubmitting: uploadMemberIconMutation.isPending,
    errors: form.formState.errors,
    register: form.register,
    watch: form.watch,
    setValue: form.setValue,
  };
};