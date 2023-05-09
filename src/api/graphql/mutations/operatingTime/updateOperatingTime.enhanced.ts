import { api } from "./updateOperatingTime.generated";

export const enhancedUpdateTradingTimeApi = api.enhanceEndpoints({
  addTagTypes: ["OperatingTimes"],
  endpoints: {
    updateOperatingTime: { invalidatesTags: [] },
  },
});

export const { useUpdateOperatingTimeMutation } = enhancedUpdateTradingTimeApi;
