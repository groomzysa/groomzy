import { useAddStaffMutation } from "../../../graphql/mutations/staff/addStaff.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useCreateStaff = () => {
  const [createStaff, { data, isLoading, isError, isSuccess, error }] =
    useAddStaffMutation();

  return {
    createStaff,
    createdStaff: data?.addStaff,
    createStaffSuccess: isSuccess,
    createStaffLoading: isLoading,
    createStaffHasError: isError,
    createStaffError: getErrorMessage(error),
  };
};
