import { useUpdateGalleryMutation } from "../../../graphql/mutations/gallery/updateGallery.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useUpdateGallery = () => {
  const [updateGallery, { data, isLoading, isError, error, isSuccess }] =
    useUpdateGalleryMutation();

  return {
    updateGallery,
    updatedGallery: data?.updateGallery,
    updateGallerySuccess: isSuccess,
    updateGalleryLoading: isLoading,
    updateGalleryHasError: isError,
    updateGalleryError: getErrorMessage(error),
  };
};
