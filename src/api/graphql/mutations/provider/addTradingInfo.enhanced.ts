import { api } from "./addTradingInfo.generated";

export const enhancedAddTradingInfoApi = api.enhanceEndpoints({
  addTagTypes: ["Provider"],
  endpoints: {
    addTradingInfo: { invalidatesTags: ["Provider"] },
  },
});

export const { useAddTradingInfoMutation } = enhancedAddTradingInfoApi;
