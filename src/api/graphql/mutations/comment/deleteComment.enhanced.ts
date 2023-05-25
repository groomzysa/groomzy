import { api } from "./deleteComment.generated";

export const enhancedDeleteCommentApi = api.enhanceEndpoints({
  addTagTypes: ["Comments"],
  endpoints: {
    deleteComment: { invalidatesTags: ["Comments"] },
  },
});

export const { useDeleteCommentMutation } = enhancedDeleteCommentApi;
