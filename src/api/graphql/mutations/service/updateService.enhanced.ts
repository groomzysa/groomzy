import { api } from "./updateService.generated";

export const enhancedUpdateServiceApi = api.enhanceEndpoints({
  addTagTypes: ["Services"],
  endpoints: {
    updateService: { invalidatesTags: [] },
  },
});

export const { useUpdateServiceMutation } = enhancedUpdateServiceApi;
