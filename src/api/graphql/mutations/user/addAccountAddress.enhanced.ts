import { api } from "./addAccountAddress.generated";

export const enhancedAddAccountAddressApi = api.enhanceEndpoints({
  addTagTypes: ["User"],
  endpoints: {
    addAccountAddress: { invalidatesTags: ["User"] },
  },
});

export const { useAddAccountAddressMutation } = enhancedAddAccountAddressApi;
