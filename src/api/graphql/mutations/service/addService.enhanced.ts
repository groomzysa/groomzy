import { api } from "./addService.generated";

export const enhancedAddServiceApi = api.enhanceEndpoints({
  addTagTypes: ["Services"],
  endpoints: {
    addService: { invalidatesTags: [] },
  },
});

export const { useAddServiceMutation } = enhancedAddServiceApi;
