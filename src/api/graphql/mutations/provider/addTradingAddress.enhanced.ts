import { api } from "./addTradingAddress.generated";

export const enhancedAddTradingAddressApi = api.enhanceEndpoints({
  addTagTypes: ["Provider"],
  endpoints: {
    addTradingAddress: { invalidatesTags: ["Provider"] },
  },
});

export const { useAddTradingAddressMutation } = enhancedAddTradingAddressApi;
