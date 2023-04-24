import { useAddTradingAddressMutation } from "../../../graphql/mutations/provider/addTradingAddress.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useAddTradingAddress = () => {
  const [addTradingAddress, { data, isLoading, isSuccess, isError, error }] =
    useAddTradingAddressMutation();

  return {
    addTradingAddress,
    addedTradingAddress: data?.addTradingAddress,
    addTradingAddressLoading: isLoading,
    addTradingAddressSuccess: isSuccess,
    addTradingAddressHasError: isError,
    addTradingAddressError: getErrorMessage(error),
  };
};
