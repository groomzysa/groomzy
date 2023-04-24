import { useUpdateOperatingTimeMutation } from "../../../graphql/mutations/operatingTime/updateOperatingTime.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useUpdateOperatingTime = () => {
  const [updateOperatingTime, { data, isLoading, isSuccess, isError, error }] =
    useUpdateOperatingTimeMutation();

  return {
    updateOperatingTime,
    updatedOperatingTime: data?.updateOperatingTime,
    updateOperatingTimeLoading: isLoading,
    updateOperatingTimeSuccess: isSuccess,
    updateOperatingTimeHasError: isError,
    updateOperatingTimeError: getErrorMessage(error),
  };
};
