import { api } from "./provider.generated";

export const enhancedProviderApi = api.enhanceEndpoints({
  addTagTypes: ["Provider"],
  endpoints: {
    provider: { providesTags: ["Provider"] },
  },
});

export const { useProviderQuery, useLazyProviderQuery } = enhancedProviderApi;
