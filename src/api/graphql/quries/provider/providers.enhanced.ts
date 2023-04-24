import { api } from "./providers.generated";

export const enhancedProvidersApi = api.enhanceEndpoints({
  addTagTypes: ["Providers"],
  endpoints: {
    providers: { providesTags: ["Providers"] },
  },
});

export const { useProvidersQuery, useLazyProvidersQuery } =
  enhancedProvidersApi;
