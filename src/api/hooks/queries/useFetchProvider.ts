import { useLazyProviderQuery } from "../../graphql/quries/provider/provider.enhanced";
import { getErrorMessage } from "../../helpers";

export const useFetchProvider = () => {
  const [fetchProvider, { data, isLoading, isError, error }] =
    useLazyProviderQuery();

  return {
    fetchProvider,
    provider: data?.provider,
    providerLoading: isLoading,
    providerHasError: isError,
    providerError: getErrorMessage(error),
  };
};
