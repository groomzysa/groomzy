import { api } from "./addComment.generated";

export const enhancedAddCommentApi = api.enhanceEndpoints({
  addTagTypes: ["Comments"],
  endpoints: {
    addComment: { invalidatesTags: ["Comments"] },
  },
});

export const { useAddCommentMutation } = enhancedAddCommentApi;
