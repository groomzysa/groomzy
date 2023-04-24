import { useUpdateSocialMutation } from "../../../graphql/mutations/social/updateSocial.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useUpdateSocial = () => {
  const [updateSocialTrigger, { data, isLoading, isError, error }] =
    useUpdateSocialMutation();

  return {
    updateSocialTrigger,
    updateSocial: data?.updateSocial,
    updateSocialLoading: isLoading,
    updateSocialHasError: isError,
    updateSocialError: getErrorMessage(error),
  };
};
