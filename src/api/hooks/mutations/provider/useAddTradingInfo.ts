import { useAddTradingInfoMutation } from "../../../graphql/mutations/provider/addTradingInfo.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useAddTradingInfo = () => {
  const [addTradingInfo, { data, isSuccess, isLoading, isError, error }] =
    useAddTradingInfoMutation();

  return {
    addTradingInfo,
    addedTradingInfo: data?.addTradingInfo,
    addTradingInfoLoading: isLoading,
    addTradingInfoSuccess: isSuccess,
    addTradingInfoHasError: isError,
    addTradingInfoError: getErrorMessage(error),
  };
};
