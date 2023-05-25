import { Dispatch, SetStateAction, useEffect, useState, useMemo } from "react";
import { useAddComment } from "../../../../../api/hooks/mutations";
import { isEmpty } from "lodash";
import { IInput } from "../../../../../utils/types";
import { useCustomToast } from "../../../../../hooks/useCustomToast";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { getErrorMessage } from "../../../../../api/helpers";
import { CREATE_COMMENT_MESSAGE } from "../../../../../utils/messages";
import { useParams } from "react-router-dom";
import { useFetchComments } from "../../../../../api/hooks/queries";
import { Comment } from "../../../../../api/graphql/api.schema";
import { api } from "../../../../../api";

export const useReviews = () => {
  const [message, setMessage] = useState<IInput<string>>();
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [addCommentLoading, setAddCommentLoading] = useState(false);

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

  const { fetchComments, comments, commentsLoading } = useFetchComments();

  const commentsByParentId = useMemo(() => {
    const group: { [key: number]: Comment[] } = {};
    comments?.forEach((comment: Comment) => {
      group[comment.id] ||= [];
      group[comment.id].push(comment);
    });

    return group;
  }, [comments]);

  /**
   *
   * Effects
   *
   */

  useEffect(() => {
    fetchComments({
      providerId: Number(providerId),
      limit: 10,
    });
  }, [fetchComments, providerId]);

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

    onInputCheckUpdate(value, "Message is required.", setMessage);
  };

  const onShowMessageInput = () => {
    if (!isLoggedIn) {
      toast({
        message: "You must be logged in to add comment.",
        buttonDismiss: true,
      });
      return;
    }

    setShowMessageInput(!showMessageInput);
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
      }).unwrap();

      setAddCommentLoading(false);
      setMessage(undefined);
      setShowMessageInput(!showMessageInput);
      toast({ message: CREATE_COMMENT_MESSAGE });
    } catch (error) {
      setAddCommentLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong creating comment",
        buttonDismiss: true,
      });
    }
  };

  const onCancel = () => {
    setMessage(undefined);
    setShowMessageInput(!showMessageInput);
  };

  const getReplies = (parentId: number) => {
    return commentsByParentId[parentId];
  };

  return {
    isLoggedIn,
    comments,
    message,
    showMessageInput,
    addCommentLoading,
    commentsLoading,
    getReplies,
    onMessageChange,
    onCanAddComment,
    onAddComment,
    onShowMessageInput,
    onCancel,
  };
};
