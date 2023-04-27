import { useLazyGalleryQuery } from "../../../graphql/quries/gallery/gallery.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchGallery = () => {
  const [fetchGallery, { data, isLoading, isSuccess, isError, error }] =
    useLazyGalleryQuery();

  return {
    fetchGallery,
    gallery: data?.gallery,
    galleryLoading: isLoading,
    gallerySuccess: isSuccess,
    galleryHasError: isError,
    galleryError: getErrorMessage(error),
  };
};
