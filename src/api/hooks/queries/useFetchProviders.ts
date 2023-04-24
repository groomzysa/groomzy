import { useLazyProvidersQuery } from "../../graphql/quries/provider/providers.enhanced";
import { getErrorMessage } from "../../helpers";

export const useFetchProviders = () => {
  const [fetchProviders, { data, isLoading, isError, error }] =
    useLazyProvidersQuery();

  return {
    fetchProviders,
    providers: data?.providers,
    providersLoading: isLoading,
    providersHasError: isError,
    providersError: getErrorMessage(error),
  };
};
