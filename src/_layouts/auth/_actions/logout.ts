export const logout = async (): Promise<void> => {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || ''}/auth/logout`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};