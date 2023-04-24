import { api } from "./deleteOperatingTime.generated";

export const enhancedDeleteTradingTimeApi = api.enhanceEndpoints({
  addTagTypes: ["OperatingTimes"],
  endpoints: {
    deleteOperatingTime: { invalidatesTags: ["OperatingTimes"] },
  },
});

export const { useDeleteOperatingTimeMutation } = enhancedDeleteTradingTimeApi;
