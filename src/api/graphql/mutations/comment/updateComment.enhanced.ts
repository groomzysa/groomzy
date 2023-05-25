import { api } from "./updateComment.generated";

export const enhancedUpdateCommentApi = api.enhanceEndpoints({
  addTagTypes: ["Comments"],
  endpoints: {
    updateComment: { invalidatesTags: ["Comments"] },
  },
});

export const { useUpdateCommentMutation } = enhancedUpdateCommentApi;
