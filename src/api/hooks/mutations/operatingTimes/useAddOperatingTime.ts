import { useAddOperatingTimeMutation } from "../../../graphql/mutations/operatingTime/addOperatingTime.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useAddOperatingTime = () => {
  const [addOperatingTime, { data, isLoading, isSuccess, isError, error }] =
    useAddOperatingTimeMutation();

  return {
    addOperatingTime,
    newOperatingTime: data?.addOperatingTime,
    addOperatingTimeLoading: isLoading,
    addOperatingTimeSuccess: isSuccess,
    addOperatingTimeHasError: isError,
    addOperatingTimeError: getErrorMessage(error),
  };
};
