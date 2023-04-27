import { useLazyUserQuery } from "../../../graphql/quries/user/user.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchUser = () => {
  const [
    fetchUser,
    { data, isLoading, isError, error, isUninitialized, isFetching },
  ] = useLazyUserQuery();

  return {
    fetchUser,
    user: data?.user,
    userIsLoading: isLoading,
    userHasError: isError,
    userIsUninitialized: isUninitialized,
    userIsFetching: isFetching,
    userError: getErrorMessage(error),
  };
};
