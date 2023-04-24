import { useUpdateAccountAddressMutation } from "../../../graphql/mutations/user/updateAccountAddress.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useUpdateAccountAddress = () => {
  const [updateAccountAddress, { data, isLoading, isSuccess, isError, error }] =
    useUpdateAccountAddressMutation();

  return {
    updateAccountAddress,
    updatedAccountAddress: data?.updateAccountAddress,
    updateAccountAddressLoading: isLoading,
    updateAccountAddressSuccess: isSuccess,
    updateAccountAddressHasError: isError,
    updateAccountAddressError: getErrorMessage(error),
  };
};
