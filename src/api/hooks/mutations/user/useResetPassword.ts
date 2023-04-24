import { useResetPasswordMutation } from "../../../graphql/mutations/user/resetPassword.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useResetPassword = () => {
  const [resetPassword, { data, isLoading, isError, isSuccess, error }] =
    useResetPasswordMutation();

  return {
    resetPassword,
    resetedPassword: data?.resetPassword,
    resetPasswordLoading: isLoading,
    resetPasswordSuccess: isSuccess,
    resetPasswordHasError: isError,
    resetPasswordError: getErrorMessage(error),
  };
};
