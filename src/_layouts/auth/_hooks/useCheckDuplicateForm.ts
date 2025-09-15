import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkDuplicateSchema, CheckDuplicateSchema } from "../_schemas/authForms.schema";
import { useCheckDuplicateQuery } from "./react-query/useCheckDuplicateQuery";
import { useCheckDuplicateStore } from "../_store/useCheckDuplicateStore";
import { useEffect } from "react";

export const useCheckDuplicateForm = (externalId?: string) => {
  const {
    checkedId,
    isChecked,
    isDuplicateAvailable,
    isLoading: storeLoading,
    setCheckedId,
    setIsChecked,
    setIsDuplicateAvailable,
    setIsLoading,
    resetCheck,
    checkIfIdChanged,
  } = useCheckDuplicateStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckDuplicateSchema>({
    resolver: zodResolver(checkDuplicateSchema),
    defaultValues: {
      id: "",
    },
  });

  const watchedId = watch("id");
  const currentId = externalId || watchedId;

  const { data: duplicateResult, isLoading: queryLoading, error } = useCheckDuplicateQuery(
    { id: currentId },
    {
      enabled: isChecked && !!currentId && currentId.length >= 5 && checkedId === currentId,
    }
  );

  useEffect(() => {
    if (currentId && currentId.length >= 5) {
      checkIfIdChanged(currentId);
    }
  }, [currentId, checkIfIdChanged]);

  useEffect(() => {
    setIsLoading(queryLoading);
  }, [queryLoading, setIsLoading]);

  useEffect(() => {
    if (duplicateResult !== undefined) {
      setIsDuplicateAvailable(!duplicateResult.isDuplicated);
    }
  }, [duplicateResult, setIsDuplicateAvailable]);

  const checkDuplicate = () => {
    if (currentId && currentId.length >= 5) {
      setCheckedId(currentId);
      setIsChecked(true);
    }
  };

  const validateIdForSubmit = (submitId: string): boolean => {
    if (!isChecked || checkedId !== submitId) {
      return false;
    }
    return isDuplicateAvailable;
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    duplicateResult,
    isLoading: storeLoading,
    error,
    checkDuplicate,
    resetCheck,
    isDuplicateAvailable,
    isChecked,
    checkedId,
    validateIdForSubmit,
  };
};