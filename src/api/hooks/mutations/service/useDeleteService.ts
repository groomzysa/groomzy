import { useDeleteServiceMutation } from "../../../graphql/mutations/service/deleteService.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useDeleteService = () => {
  const [deleteService, { data, isLoading, isSuccess, isError, error }] =
    useDeleteServiceMutation();

  return {
    deleteService,
    deletedService: data?.deleteService,
    deleteServiceLoading: isLoading,
    deleteServiceSuccess: isSuccess,
    deleteServiceHasError: isError,
    deleteServiceError: getErrorMessage(error),
  };
};
