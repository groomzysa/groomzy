import { isEqual } from "lodash";
import { api } from "./operatingTimes.generated";

export const enhancedOperatingTimesApi = api.enhanceEndpoints({
  addTagTypes: ["OperatingTimes"],
  endpoints: {
    operatingTimes: {
      providesTags: ["OperatingTimes"],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (currentCache.operatingTimes && newItems.operatingTimes) {
          currentCache.operatingTimes = newItems.operatingTimes;
        }

        if (
          currentCache.operatingTimes?.count &&
          newItems.operatingTimes?.count
        ) {
          currentCache.operatingTimes.count = newItems.operatingTimes.count;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return !isEqual(currentArg, previousArg);
      },
    },
  },
});

export const { useLazyOperatingTimesQuery, useOperatingTimesQuery } =
  enhancedOperatingTimesApi;
