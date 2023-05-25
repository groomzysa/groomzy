import { useLazyCommentsQuery } from "../../../graphql/quries/comment/comments.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchComments = () => {
  const [fetchComments, { data, isLoading, isError, error }] =
    useLazyCommentsQuery();

  return {
    fetchComments,
    comments: data?.comments?.comments,
    cursor: data?.comments?.cursor,
    commentsLoading: isLoading,
    commentsHasError: isError,
    commentsError: getErrorMessage(error),
  };
};
