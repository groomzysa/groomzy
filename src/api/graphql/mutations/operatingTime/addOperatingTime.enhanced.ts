import { api } from "./addOperatingTime.generated";

export const enhancedAddTradingTimeApi = api.enhanceEndpoints({
  addTagTypes: ["OperatingTimes"],
  endpoints: {
    addOperatingTime: { invalidatesTags: [] },
  },
});

export const { useAddOperatingTimeMutation } = enhancedAddTradingTimeApi;
