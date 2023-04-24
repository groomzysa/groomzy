import { useUpdateTradingInfoMutation } from "../../../graphql/mutations/provider/updateTradingInfo.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useUpdateTradingInfo = () => {
  const [updateTradingInfo, { data, isLoading, isSuccess, isError, error }] =
    useUpdateTradingInfoMutation();

  return {
    updateTradingInfo,
    updatedTradingInfo: data?.updateTradingInfo,
    updateTradingInfoLoading: isLoading,
    updateTradingInfoSuccess: isSuccess,
    updateTradingInfoHasError: isError,
    updateTradingInfoError: getErrorMessage(error),
  };
};
