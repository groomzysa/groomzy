import { api } from "./comment.generated";

export const enhancedCommentApi = api.enhanceEndpoints({
  addTagTypes: ["Comment"],
  endpoints: {
    comment: { providesTags: ["Comment"] },
  },
});

export const { useLazyCommentQuery, useCommentQuery } = enhancedCommentApi;
