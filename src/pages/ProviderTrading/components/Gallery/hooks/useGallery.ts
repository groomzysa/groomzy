import { RefresherEventDetail } from "@ionic/react";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GalleriesQueryVariables } from "../../../../../api/graphql/api.schema";
import { useFetchGalleries } from "../../../../../api/hooks/queries";
import { PAGE_SIZE } from "../constants";

export const useGallery = () => {
  const { id } = useParams<{ id: string }>();

  /**
   *
   * Hooks
   *
   */
  const {
    fetchGalleries,
    galleries,
    cursor,
    galleriesError,
    galleriesHasError,
    galleriesLoading,
  } = useFetchGalleries();

  const fetchGalleryData = useCallback(
    (variables: GalleriesQueryVariables) => {
      fetchGalleries(variables);
    },
    [fetchGalleries]
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

    fetchGalleryData({
      providerId: Number(id),
      limit: PAGE_SIZE,
    });
  }, [id, fetchGalleryData]);

  /**
   *
   * Handlers
   *
   */

  const onRefetchGallery = async (event: CustomEvent<RefresherEventDetail>) => {
    if (!id) {
      return;
    }

    fetchGalleryData({
      providerId: Number(id),
      limit: PAGE_SIZE,
      cursor,
    });
    event.detail.complete();
  };

  return {
    cursor,
    galleries,
    galleriesError,
    galleriesHasError,
    galleriesLoading,
    fetchGalleryData,
    onRefetchGallery,
  };
};
