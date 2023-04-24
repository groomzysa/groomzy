import { api } from "./deleteService.generated";

export const enhancedDeleteServiceApi = api.enhanceEndpoints({
  addTagTypes: ["Services"],
  endpoints: {
    deleteService: { invalidatesTags: [] },
  },
});

export const { useDeleteServiceMutation } = enhancedDeleteServiceApi;
