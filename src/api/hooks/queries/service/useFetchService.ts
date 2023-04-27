import { useLazyServiceQuery } from "../../../graphql/quries/service/service.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchService = () => {
  const [fetchService, { data, isLoading, isSuccess, isError, error }] =
    useLazyServiceQuery();

  return {
    fetchService,
    service: data?.service,
    serviceLoading: isLoading,
    serviceSuccess: isSuccess,
    serviceHasError: isError,
    serviceError: getErrorMessage(error),
  };
};
