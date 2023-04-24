import { api } from "./user.generated";

export const enhancedUserApi = api.enhanceEndpoints({
  addTagTypes: ["User"],
  endpoints: {
    user: { providesTags: ["User"] },
  },
});

export const { useLazyUserQuery, useUserQuery } = enhancedUserApi;
