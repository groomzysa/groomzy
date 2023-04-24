import { isEqual } from "lodash";
import { api } from "./services.generated";

export const enhancedServicesApi = api.enhanceEndpoints({
  addTagTypes: ["Services"],
  endpoints: {
    services: {
      providesTags: ["Services"],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (currentCache.services?.services && newItems.services?.services) {
          currentCache.services.services = newItems.services.services;
        }

        if (currentCache.services?.count && newItems.services?.count) {
          currentCache.services.count = newItems.services.count;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return !isEqual(currentArg, previousArg);
      },
    },
  },
});

export const { useLazyServicesQuery, useServicesQuery } = enhancedServicesApi;
