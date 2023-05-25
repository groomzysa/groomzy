import { Dispatch, SetStateAction, useState } from "react";
import { IInput } from "../../../../../../../utils/types";
import { isEmpty } from "lodash";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { useParams } from "react-router-dom";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import {
  useAddComment,
  useUpdateComment,
} from "../../../../../../../api/hooks/mutations";
import {
  CREATE_COMMENT_MESSAGE,
  UPDATE_COMMENT_MESSAGE,
} from "../../../../../../../utils/messages";
import { api } from "../../../../../../../api";

export const useReview = () => {
  const [message, setMessage] = useState<IInput<string>>();
  const [showInput, setShowInput] = useState<{
    parentId: number;
    update?: {
      commentId: number;
    };
    show: boolean;
  }>();
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [updateCommentLoading, setUpdateCommentLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<{
    commentId: number;
    show: boolean;
  }>();

  // @ts-ignore
  const isLoggedIn = !isEmpty(api.endpoints?.user?.useQuery()?.data.user);

  /**
   *
   * Hooks
   *
   */
  const { id: providerId } = useParams<{ id: string }>();

  const { toast } = useCustomToast();

  const { createComment } = useAddComment();
  const { updateComment } = useUpdateComment();

  /**
   *
   * Handlers
   *
   */
  const onInputCheckUpdate = (
    value: string,
    error: string,
    setValue: Dispatch<SetStateAction<IInput<string> | undefined>>
  ) => {
    if (!value) {
      setValue({ value, error });
    } else {
      setValue({ value, error: "" });
    }
  };

  const onMessageChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "Reply message is required.", setMessage);
  };

  const onCanAddComment = (): boolean => {
    const error = !isEmpty(message?.error);
    const missingFilled = isEmpty(message?.value);

    return !error && !missingFilled;
  };

  const onAddComment = async () => {
    if (!onCanAddComment()) return;

    setAddCommentLoading(true);

    try {
      await createComment({
        message: message!.value,
        providerId: Number(providerId),
        parentId: showInput?.parentId,
      }).unwrap();

      setAddCommentLoading(false);
      setMessage(undefined);
      setShowInput(undefined);
      toast({ message: CREATE_COMMENT_MESSAGE });
    } catch (error) {
      setAddCommentLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong creating a comment",
        buttonDismiss: true,
      });
    }
  };

  const onUpdateComment = async (commentId: number) => {
    setUpdateCommentLoading(true);

    try {
      await updateComment({
        message: message!.value,
        commentId,
      }).unwrap();

      setUpdateCommentLoading(false);
      setMessage(undefined);
      setShowInput(undefined);
      toast({ message: UPDATE_COMMENT_MESSAGE });
    } catch (error) {
      setUpdateCommentLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong updating a comment",
        buttonDismiss: true,
      });
    }
  };

  const onIsDeleteOpen = (commentId: number, show: boolean) => {
    if (!isLoggedIn) {
      toast({
        message: "You must be logged in to delete comment.",
        buttonDismiss: true,
      });

      return;
    }

    setIsDeleteOpen({
      commentId,
      show,
    });
  };

  const onShowInput = (id: number, commentId?: number) => {
    if (!isLoggedIn) {
      toast({
        message: "You must be logged in to add comment.",
        buttonDismiss: true,
      });
      return;
    }

    setShowInput({
      parentId: id,
      update: commentId ? { commentId } : undefined,
      show: true,
    });
  };

  const onCancel = () => {
    setMessage(undefined);
    setShowInput(undefined);
  };

  return {
    message,
    showInput,
    isDeleteOpen,
    addCommentLoading,
    updateCommentLoading,
    onMessageChange,
    onCancel,
    onCanAddComment,
    onAddComment,
    onShowInput,
    onIsDeleteOpen,
    onUpdateComment,
  };
};
