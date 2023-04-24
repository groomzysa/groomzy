import { useUpdateTradingAddressMutation } from "../../../graphql/mutations/provider/updateTradingAddress.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useUpdateTradingAddress = () => {
  const [updateTradingAddress, { data, isLoading, isSuccess, isError, error }] =
    useUpdateTradingAddressMutation();

  return {
    updateTradingAddress,
    updatedTradingAddress: data?.updateTradingAddress,
    updateTradingAddressLoading: isLoading,
    updateTradingAddressSuccess: isSuccess,
    updateTradingAddressHasError: isError,
    updateTradingAddressError: getErrorMessage(error),
  };
};
