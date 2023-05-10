import { useLazyStaffQuery } from "../../../graphql/quries/staff/staff.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchStaff = () => {
  const [fetchStaff, { data, isLoading, isSuccess, isError, error }] =
    useLazyStaffQuery();

  return {
    fetchStaff,
    staff: data?.staff,
    staffLoading: isLoading,
    staffSuccess: isSuccess,
    staffHasError: isError,
    staffError: getErrorMessage(error),
  };
};
