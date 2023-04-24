import { useLazyOperatingTimesQuery } from "../../../graphql/quries/operatingTime/operatingTimes.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchOperatingTimes = () => {
  const [fetchOperatingTimes, { data, isLoading, isSuccess, isError, error }] =
    useLazyOperatingTimesQuery();

  return {
    fetchOperatingTimes,
    operatingTimes: data?.operatingTimes,
    operatingTimesLoading: isLoading,
    operatingTimesSuccess: isSuccess,
    operatingTimesHasError: isError,
    operatingTimesError: getErrorMessage(error),
  };
};
