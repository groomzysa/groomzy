import { useAddGalleryMutation } from "../../../graphql/mutations/gallery/addGallery.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useCreateGallery = () => {
  const [createGallery, { data, isLoading, isError, isSuccess, error }] =
    useAddGalleryMutation();

  return {
    createGallery,
    createdGallery: data?.addGallery,
    createGallerySuccess: isSuccess,
    createGalleryLoading: isLoading,
    createGalleryHasError: isError,
    createGalleryError: getErrorMessage(error),
  };
};
