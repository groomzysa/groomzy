import { useDeleteOperatingTimeMutation } from "../../../graphql/mutations/operatingTime/deleteOperatingTime.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useDeleteOperatingTime = () => {
  const [deleteOperatingTime, { data, isLoading, isSuccess, isError, error }] =
    useDeleteOperatingTimeMutation();

  return {
    deleteOperatingTime,
    deletedOperatingTime: data?.deleteOperatingTime,
    deleteOperatingTimeLoading: isLoading,
    deleteOperatingTimeSuccess: isSuccess,
    deleteOperatingTimeHasError: isError,
    deleteOperatingTimeError: getErrorMessage(error),
  };
};
