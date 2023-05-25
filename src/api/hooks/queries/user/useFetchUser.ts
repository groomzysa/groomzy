import { useLazyUserQuery } from "../../../graphql/quries/user/user.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchUser = () => {
  const [
    fetchUser,
    { data, isLoading, isError, error, isUninitialized, isFetching, isSuccess },
  ] = useLazyUserQuery();

  return {
    fetchUser,
    user: data?.user,
    userIsLoading: isLoading,
    userIsSuccess: isSuccess,
    userHasError: isError,
    userIsUninitialized: isUninitialized,
    userIsFetching: isFetching,
    userError: getErrorMessage(error),
  };
};
