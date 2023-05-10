import { isEqual } from "lodash";
import { api } from "./staffs.generated";

export const enhancedStaffsApi = api.enhanceEndpoints({
  addTagTypes: ["Staffs"],
  endpoints: {
    staffs: {
      providesTags: ["Staffs"],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (currentCache.staffs?.staffs && newItems.staffs?.staffs) {
          currentCache.staffs.staffs = newItems.staffs.staffs;
        }

        if (currentCache.staffs?.count && newItems.staffs?.count) {
          currentCache.staffs.count = newItems.staffs.count;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return !isEqual(currentArg, previousArg);
      },
    },
  },
});

export const { useLazyStaffsQuery, useStaffsQuery } = enhancedStaffsApi;
