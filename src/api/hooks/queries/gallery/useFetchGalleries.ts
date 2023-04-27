import { useLazyGalleriesQuery } from "../../../graphql/quries/gallery/galleries.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchGalleries = () => {
  const [fetchGalleries, { data, isLoading, isError, error }] =
    useLazyGalleriesQuery();

  return {
    fetchGalleries,
    galleries: data?.galleries?.galleries,
    cursor: data?.galleries?.cursor,
    galleriesLoading: isLoading,
    galleriesHasError: isError,
    galleriesError: getErrorMessage(error),
  };
};
