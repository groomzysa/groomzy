import { api } from "./updateTradingAddress.generated";

export const enhancedUpdateTradingAddressApi = api.enhanceEndpoints({
  addTagTypes: ["Provider"],
  endpoints: {
    updateTradingAddress: { invalidatesTags: ["Provider"] },
  },
});

export const { useUpdateTradingAddressMutation } =
  enhancedUpdateTradingAddressApi;
