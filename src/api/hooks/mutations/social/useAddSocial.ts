import { useAddSocialMutation } from "../../../graphql/mutations/social/addSocial.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useAddSocial = () => {
  const [addSocialTrigger, { data, isLoading, isError, error }] =
    useAddSocialMutation();

  return {
    addSocialTrigger,
    addSocial: data?.addSocial,
    addSocialLoading: isLoading,
    addSocialHasError: isError,
    addSocialError: getErrorMessage(error),
  };
};
