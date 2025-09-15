import { useMutation } from '@tanstack/react-query';
import { signout } from '../signout';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useSignout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signout,
    onSuccess: (data) => {
      localStorage.removeItem('signinTime');
      localStorage.removeItem('session');
      toast.success(data);
      router.replace('/signin');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
