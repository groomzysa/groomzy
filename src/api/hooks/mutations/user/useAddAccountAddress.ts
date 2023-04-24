import { useAddAccountAddressMutation } from "../../../graphql/mutations/user/addAccountAddress.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useAddAccountAddress = () => {
  const [addAccountAddress, { data, isLoading, isSuccess, isError, error }] =
    useAddAccountAddressMutation();

  return {
    addAccountAddress,
    addedAccountAddress: data?.addAccountAddress,
    addAccountAddressLoading: isLoading,
    addAccountAddressSuccess: isSuccess,
    addAccountAddressHasError: isError,
    addAccountAddressError: getErrorMessage(error),
  };
};
