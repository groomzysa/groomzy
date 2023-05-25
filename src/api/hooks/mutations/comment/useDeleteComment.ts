import { useDeleteCommentMutation } from "../../../graphql/mutations/comment/deleteComment.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useDeleteComment = () => {
  const [deleteComment, { data, isLoading, isSuccess, isError, error }] =
    useDeleteCommentMutation();

  return {
    deleteComment,
    deletedComment: data?.deleteComment,
    deleteCommentLoading: isLoading,
    deleteCommentSuccess: isSuccess,
    deleteCommentHasError: isError,
    deleteCommentError: getErrorMessage(error),
  };
};
