import { useDeleteStaffMutation } from "../../../graphql/mutations/staff/deleteStaff.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useDeleteStaff = () => {
  const [deleteStaff, { data, isLoading, isSuccess, isError, error }] =
    useDeleteStaffMutation();

  return {
    deleteStaff,
    deletedStaff: data?.deleteStaff,
    deleteStaffLoading: isLoading,
    deleteStaffSuccess: isSuccess,
    deleteStaffHasError: isError,
    deleteStaffError: getErrorMessage(error),
  };
};
