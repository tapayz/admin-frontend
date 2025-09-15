import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../_schemas/authForms.schema";
import { useLoginMutation } from "./react-query/useLoginMutation";
import { Provider } from "../_dtos/provider.enum";

export const useSignInForm = () => {
  const { mutate: loginMutate, isPending } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    loginMutate({
      id: data.id,
      password: data.password,
      provider: data.provider as Provider,
    });
  };

  return { 
    register, 
    handleSubmit, 
    errors, 
    isSubmitting: isSubmitting || isPending, 
    onSubmit 
  };
};
