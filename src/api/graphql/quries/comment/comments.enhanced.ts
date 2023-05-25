import { isEqual } from "lodash";
import { api } from "./comments.generated";

export const enhancedCommentsApi = api.enhanceEndpoints({
  addTagTypes: ["Comments"],
  endpoints: {
    comments: {
      providesTags: ["Comments"],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (currentCache.comments?.comments && newItems.comments?.comments) {
          currentCache.comments.comments = newItems.comments.comments;
        }

        if (currentCache.comments?.count && newItems.comments?.count) {
          currentCache.comments.count = newItems.comments.count;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return !isEqual(currentArg, previousArg);
      },
    },
  },
});

export const { useLazyCommentsQuery, useCommentsQuery } = enhancedCommentsApi;
