import { useRequestPasswordResetMutation } from "../../../graphql/mutations/user/requestPasswordReset.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useRequestPasswordReset = () => {
  const [requestPasswordReset, { data, isLoading, isError, isSuccess, error }] =
    useRequestPasswordResetMutation();

  return {
    requestPasswordReset,
    requestedPasswordReset: data?.requestPasswordReset,
    requestPasswordResetLoading: isLoading,
    requestPasswordResetSuccess: isSuccess,
    requestPasswordResetHasError: isError,
    requestPasswordResetError: getErrorMessage(error),
  };
};
