import { RefresherEventDetail, useIonToast } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { Provider } from "../../../../../api/graphql/api.schema";
import { useFetchProviders } from "../../../../../api/hooks/queries";
import { getErrorMessage } from "../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

export const useServiceProviders = () => {
  const {
    home: { search },
  } = useSelector<RootState, Pick<RootState, "home">>((state) => state);
  const [providersLoading, setProvidersLoading] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);

  /**
   *
   * Hooks
   *
   */
  const [present] = useIonToast();

  const { fetchProviders } = useFetchProviders();

  const onFetchProviders = useCallback(async () => {
    setProvidersLoading(true);
    try {
      const response = await fetchProviders({ search }).unwrap();
      setProvidersLoading(false);
      setProviders(response.providers);
    } catch (error) {
      setProvidersLoading(false);
      present({
        message: getErrorMessage(error as ErrorResponse) || "",
        duration: 2000,
        position: "middle",
      });
    }
  }, [search, fetchProviders, present]);

  /**
   *
   * Effects
   *
   */

  useEffect(() => {
    onFetchProviders();
  }, [onFetchProviders]);

  /**
   *
   * Handlers
   *
   */

  const refetchProvidersHandler = async (
    event: CustomEvent<RefresherEventDetail>
  ) => {
    await fetchProviders({ search });
    event.detail.complete();
  };

  return {
    search,
    providers,
    providersLoading,
    refetchProvidersHandler,
  };
};
