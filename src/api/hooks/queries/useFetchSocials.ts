import { useSocialsQuery } from "../../graphql/quries/social/socials.enhanced";
import { getErrorMessage } from "../../helpers";

export const useFetchSocials = () => {
  const { data, isLoading, isError, error } = useSocialsQuery();

  return {
    socials: data?.socials,
    socialsLoading: isLoading,
    socialsHasError: isError,
    socialsError: getErrorMessage(error),
  };
};
