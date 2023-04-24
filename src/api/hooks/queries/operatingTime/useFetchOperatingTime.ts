import { useLazyOperatingTimeQuery } from "../../../graphql/quries/operatingTime/operatingTime.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchOperatingTime = () => {
  const [fetchOperatingTime, { data, isLoading, isSuccess, isError, error }] =
    useLazyOperatingTimeQuery();

  return {
    fetchOperatingTime,
    operatingTime: data?.operatingTime,
    operatingTimeLoading: isLoading,
    operatingTimeSuccess: isSuccess,
    operatingTimeHasError: isError,
    operatingTimeError: getErrorMessage(error),
  };
};
