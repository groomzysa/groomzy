import { useSignInMutation } from "../../../graphql/mutations/user/signIn.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useSignIn = () => {
  const [signIn, { data, isLoading, isError, error }] = useSignInMutation();

  return {
    signIn,
    token: data?.signIn.token,
    user: data?.signIn.user,
    signInLoading: isLoading,
    signInHasError: isError,
    signInError: getErrorMessage(error),
  };
};
