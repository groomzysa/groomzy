import { api } from "./operatingTime.generated";

export const enhancedOperatingTimeApi = api.enhanceEndpoints({
  addTagTypes: ["OperatingTime"],
  endpoints: {
    operatingTime: {
      providesTags: ["OperatingTime"],
    },
  },
});

export const { useLazyOperatingTimeQuery, useOperatingTimeQuery } =
  enhancedOperatingTimeApi;
