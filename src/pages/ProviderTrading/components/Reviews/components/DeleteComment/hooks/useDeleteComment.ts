import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteComment as useDeleteCommentMutation } from "../../../../../../../api/hooks/mutations";
import { DELETED_COMMENT_MESSAGE } from "../../../../../../../utils/messages";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useDeleteComment = (
  onIsDeleteOpen: (commentId: number, show: boolean) => void
) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [deleteCommentLoading, setDeleteCommentLoading] = useState(false);

  /**
   *
   * Hooks
   *
   */
  const { id } = useParams<{ id: string }>();

  const { toast } = useCustomToast();

  const { deleteComment } = useDeleteCommentMutation();

  const history = useHistory();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [id, history]);

  /**
   *
   * Handlers
   *
   */

  const onDeleteComment = async (commentId: number) => {
    setDeleteCommentLoading(true);

    try {
      await deleteComment({
        commentId,
      }).unwrap();

      setDeleteCommentLoading(false);
      onIsDeleteOpen(-1, false);
      toast({ message: DELETED_COMMENT_MESSAGE });
    } catch (error) {
      setDeleteCommentLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong deleting a comment",
        buttonDismiss: true,
      });
    }
  };

  function onCloseModal() {
    setIsOpen(false);
  }

  return {
    isOpen,
    deleteCommentLoading,
    onDeleteComment,
    onCloseModal,
  };
};
