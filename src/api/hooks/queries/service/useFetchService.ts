import { useLazyServiceQuery } from "../../../graphql/quries/service/service.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchService = () => {
  const [fetchService, { data, isLoading, isError, error }] =
    useLazyServiceQuery();

  return {
    fetchService,
    service: data?.service,
    serviceLoading: isLoading,
    serviceHasError: isError,
    serviceError: getErrorMessage(error),
  };
};
