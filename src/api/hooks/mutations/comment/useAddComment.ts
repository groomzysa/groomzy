import { useAddCommentMutation } from "../../../graphql/mutations/comment/addComment.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useAddComment = () => {
  const [createComment, { data, isLoading, isError, isSuccess, error }] =
    useAddCommentMutation();

  return {
    createComment,
    createdComment: data?.addComment,
    createCommentSuccess: isSuccess,
    createCommentLoading: isLoading,
    createCommentHasError: isError,
    createCommentError: getErrorMessage(error),
  };
};
