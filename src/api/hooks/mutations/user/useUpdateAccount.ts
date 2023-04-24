import { useUpdateAccountMutation } from "../../../graphql/mutations/user/updateAccount.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useUpdateAccount = () => {
  const [updateAccount, { data, isLoading, isSuccess, isError, error }] =
    useUpdateAccountMutation();

  return {
    updateAccount,
    updatedAccount: data?.updateAccount,
    updateAccountLoading: isLoading,
    updateAccountSuccess: isSuccess,
    updateAccountHasError: isError,
    updateAccountError: getErrorMessage(error),
  };
};
