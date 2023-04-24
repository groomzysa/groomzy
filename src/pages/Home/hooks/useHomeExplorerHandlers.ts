import { RefresherEventDetail } from "@ionic/react";
import { useEffect, useState } from "react";
import { useFetchProviders } from "../../../api/hooks/queries";

export const useHomeExplorerHandlers = () => {
  const [search, setSearch] = useState<string>();

  /**
   *
   * Hooks
   *
   */
  const {
    fetchProviders,
    providers,
    providersError,
    providersHasError,
    providersLoading,
  } = useFetchProviders();

  /**
   *
   * Effects
   *
   */

  useEffect(() => {
    fetchProviders({ search });
  }, [search, fetchProviders]);

  /**
   *
   * Handlers
   *
   */
  const onSearchChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setSearch(value);
  };

  const onSearchClear = () => {
    setSearch(undefined);
  };

  const refetchProvidersHandler = async (
    event: CustomEvent<RefresherEventDetail>
  ) => {
    await fetchProviders({ search });
    event.detail.complete();
  };

  return {
    search,
    providers,
    providersError,
    providersHasError,
    providersLoading,
    refetchProvidersHandler,
    onSearchChange,
    onSearchClear,
  };
};
