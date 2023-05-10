import { useUpdateStaffMutation } from "../../../graphql/mutations/staff/updateStaff.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useUpdateStaff = () => {
  const [updateStaff, { data, isLoading, isError, error, isSuccess }] =
    useUpdateStaffMutation();

  return {
    updateStaff,
    updatedStaff: data?.updateStaff,
    updateStaffSuccess: isSuccess,
    updateStaffLoading: isLoading,
    updateStaffHasError: isError,
    updateStaffError: getErrorMessage(error),
  };
};
