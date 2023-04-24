import { useAddServiceMutation } from "../../../graphql/mutations/service/addService.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useCreateService = () => {
  const [createService, { data, isLoading, isError, isSuccess, error }] =
    useAddServiceMutation();

  return {
    createService,
    createdService: data?.addService,
    createServiceSuccess: isSuccess,
    createServiceLoading: isLoading,
    createServiceHasError: isError,
    createServiceError: getErrorMessage(error),
  };
};
