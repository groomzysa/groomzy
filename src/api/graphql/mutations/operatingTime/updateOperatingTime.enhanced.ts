import { api } from "./updateOperatingTime.generated";

export const enhancedUpdateTradingTimeApi = api.enhanceEndpoints({
  addTagTypes: ["OperatingTimes"],
  endpoints: {
    updateOperatingTime: { invalidatesTags: ["OperatingTimes"] },
  },
});

export const { useUpdateOperatingTimeMutation } = enhancedUpdateTradingTimeApi;
