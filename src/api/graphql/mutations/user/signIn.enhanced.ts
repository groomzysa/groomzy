import { api } from "./signIn.generated";

export const enhancedSignInApi = api.enhanceEndpoints({
  addTagTypes: ["User"],
  endpoints: {
    signIn: {
      invalidatesTags: [],
    },
  },
});

export const { useSignInMutation } = enhancedSignInApi;
