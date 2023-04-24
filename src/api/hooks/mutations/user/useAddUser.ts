import { useAddUserMutation } from "../../../graphql/mutations/user/addUser.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useAddUser = () => {
  const [addUserTrigger, { data, isLoading, isError, error }] =
    useAddUserMutation();

  return {
    addUserTrigger,
    addUser: data?.addUser,
    addUserLoading: isLoading,
    addUserHasError: isError,
    addUserError: getErrorMessage(error),
  };
};
