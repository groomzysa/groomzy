import { useLazyServicesQuery } from "../../../graphql/quries/service/services.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchServices = () => {
  const [fetchServices, { data, isLoading, isError, error }] =
    useLazyServicesQuery();

  return {
    fetchServices,
    services: data?.services?.services,
    cursor: data?.services?.cursor,
    servicesLoading: isLoading,
    servicesHasError: isError,
    servicesError: getErrorMessage(error),
  };
};
