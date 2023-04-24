import { api } from "./addOperatingTime.generated";

export const enhancedAddTradingTimeApi = api.enhanceEndpoints({
  addTagTypes: ["OperatingTimes"],
  endpoints: {
    addOperatingTime: { invalidatesTags: ["OperatingTimes"] },
  },
});

export const { useAddOperatingTimeMutation } = enhancedAddTradingTimeApi;
