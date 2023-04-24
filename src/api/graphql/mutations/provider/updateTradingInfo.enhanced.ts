import { api } from "./updateTradingInfo.generated";

export const enhancedUpdateTradingInfoApi = api.enhanceEndpoints({
  addTagTypes: ["Provider"],
  endpoints: {
    updateTradingInfo: { invalidatesTags: ["Provider"] },
  },
});

export const { useUpdateTradingInfoMutation } = enhancedUpdateTradingInfoApi;
