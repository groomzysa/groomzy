import { RefresherEventDetail } from "@ionic/react";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ServicesQueryVariables } from "../../../../../api/graphql/api.schema";
import { useFetchServices } from "../../../../../api/hooks/queries";
import { PAGE_SIZE } from "../constants";

export const useServicesHandlers = () => {
  const { id } = useParams<{ id: string }>();

  /**
   *
   * Hooks
   *
   */
  const {
    fetchServices,
    services,
    cursor,
    servicesError,
    servicesHasError,
    servicesLoading,
  } = useFetchServices();

  const fetchServicesData = useCallback(
    (variables: ServicesQueryVariables) => {
      fetchServices(variables);
    },
    [fetchServices]
  );

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!id) {
      return;
    }

    fetchServicesData({
      providerId: Number(id),
      limit: PAGE_SIZE,
    });
  }, [id, fetchServicesData]);

  /**
   *
   * Handlers
   *
   */

  const refetchServicesHandler = async (
    event: CustomEvent<RefresherEventDetail>
  ) => {
    if (!id) {
      return;
    }

    fetchServicesData({
      providerId: Number(id),
      limit: PAGE_SIZE,
      cursor,
    });
    event.detail.complete();
  };

  return {
    services,
    cursor,
    servicesError,
    servicesHasError,
    servicesLoading,
    fetchServicesData,
    refetchServicesHandler,
  };
};
