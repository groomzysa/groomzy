import { useDeleteSocialMutation } from "../../../graphql/mutations/social/deleteSocial.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useDeleteSocial = () => {
  const [deleteSocialTrigger, { data, isLoading, isError, error }] =
    useDeleteSocialMutation();

  return {
    deleteSocialTrigger,
    deleteSocial: data?.deleteSocial,
    deleteSocialLoading: isLoading,
    deleteSocialHasError: isError,
    deleteSocialError: getErrorMessage(error),
  };
};
