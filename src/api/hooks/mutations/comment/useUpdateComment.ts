import { useUpdateCommentMutation } from "../../../graphql/mutations/comment/updateComment.enhanced";
import { getErrorMessage } from "../../../helpers";

export const useUpdateComment = () => {
  const [updateComment, { data, isLoading, isError, error, isSuccess }] =
    useUpdateCommentMutation();

  return {
    updateComment,
    updatedComment: data?.updateComment,
    updateCommentSuccess: isSuccess,
    updateCommentLoading: isLoading,
    updateCommentHasError: isError,
    updateCommentError: getErrorMessage(error),
  };
};
