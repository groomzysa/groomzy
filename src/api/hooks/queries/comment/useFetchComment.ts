import { useLazyCommentQuery } from "../../../graphql/quries/comment/comment.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useFetchComment = () => {
  const [fetchComment, { data, isLoading, isSuccess, isError, error }] =
    useLazyCommentQuery();

  return {
    fetchComment,
    comment: data?.comment,
    commentLoading: isLoading,
    commentSuccess: isSuccess,
    commentHasError: isError,
    commentError: getErrorMessage(error),
  };
};
