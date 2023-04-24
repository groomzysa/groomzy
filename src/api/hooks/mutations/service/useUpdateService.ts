import { useUpdateServiceMutation } from "../../../graphql/mutations/service/updateService.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useUpdateService = () => {
  const [updateService, { data, isLoading, isError, error, isSuccess }] =
    useUpdateServiceMutation();

  return {
    updateService,
    updatedService: data?.updateService,
    updateServiceSuccess: isSuccess,
    updateServiceLoading: isLoading,
    updateServiceHasError: isError,
    updateServiceError: getErrorMessage(error),
  };
};
