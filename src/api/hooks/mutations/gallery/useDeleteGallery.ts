import { useDeleteGalleryMutation } from "../../../graphql/mutations/gallery/deleteGallery.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useDeleteGallery = () => {
  const [deleteGallery, { data, isLoading, isSuccess, isError, error }] =
    useDeleteGalleryMutation();

  return {
    deleteGallery,
    deletedGallery: data?.deleteGallery,
    deleteGalleryLoading: isLoading,
    deleteGallerySuccess: isSuccess,
    deleteGalleryHasError: isError,
    deleteGalleryError: getErrorMessage(error),
  };
};
