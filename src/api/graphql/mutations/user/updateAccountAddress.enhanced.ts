import { api } from "./updateAccountAddress.generated";

export const enhancedUpdateAccountAddressApi = api.enhanceEndpoints({
  addTagTypes: ["User"],
  endpoints: {
    updateAccountAddress: { invalidatesTags: ["User"] },
  },
});

export const { useUpdateAccountAddressMutation } =
  enhancedUpdateAccountAddressApi;
