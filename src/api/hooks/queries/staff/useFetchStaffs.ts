import { useLazyStaffsQuery } from "../../../graphql/quries/staff/staffs.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchStaffs = () => {
  const [fetchStaffs, { data, isLoading, isError, error }] =
    useLazyStaffsQuery();

  return {
    fetchStaffs,
    services: data?.staffs?.staffs,
    cursor: data?.staffs?.cursor,
    servicesLoading: isLoading,
    servicesHasError: isError,
    servicesError: getErrorMessage(error),
  };
};
