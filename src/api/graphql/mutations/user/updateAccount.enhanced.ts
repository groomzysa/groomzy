import { api } from "./updateAccount.generated";

export const enhancedUpdateAccountApi = api.enhanceEndpoints({
  addTagTypes: ["User"],
  endpoints: {
    updateAccount: { invalidatesTags: ["User"] },
  },
});

export const { useUpdateAccountMutation } = enhancedUpdateAccountApi;
