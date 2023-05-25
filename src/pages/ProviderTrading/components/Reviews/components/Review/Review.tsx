import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonNote,
  IonRow,
} from "@ionic/react";
import { FC } from "react";
import { GInput } from "../../../../../../components";
import {
  pencilOutline,
  returnUpBackOutline,
  trashOutline,
} from "ionicons/icons";
import { IReviewProps } from "./types";
import { useReview } from "./hooks";
import "./styles.css";
import { DeleteComment } from "../DeleteComment/DeleteComment";

export const Review: FC<IReviewProps> = ({
  parentComment,
  parentId,
  getReplies,
  children,
}) => {
  const {
    message,
    showInput,
    addCommentLoading,
    updateCommentLoading,
    isDeleteOpen,
    onMessageChange,
    onCancel,
    onCanAddComment,
    onAddComment,
    onShowInput,
    onIsDeleteOpen,
    onUpdateComment,
  } = useReview();

  return (
    <>
      <IonCard className="reviews-comment">
        <IonCardContent>
          {showInput?.update ? (
            <IonGrid>
              <IonRow>
                <IonCol>
                  <GInput
                    label="Update comment"
                    type="text"
                    labelPosition="stacked"
                    value={message?.value || ""}
                    onValueChange={onMessageChange}
                    placeholder={parentComment.message || ""}
                    textAreaRows={4}
                    error={message?.error}
                    textArea
                  />
                  <IonRow>
                    <IonButton
                      fill="outline"
                      size="small"
                      onClick={() => onUpdateComment(parentComment.id)}
                      disabled={updateCommentLoading}
                    >
                      Update
                    </IonButton>
                    <IonButton
                      fill="outline"
                      color="danger"
                      size="small"
                      onClick={onCancel}
                    >
                      Cancel
                    </IonButton>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonGrid>
          ) : (
            <IonNote>{parentComment.message}</IonNote>
          )}
        </IonCardContent>
        {showInput?.parentId === parentId &&
          showInput.show &&
          !showInput.update && (
            <IonGrid className="reviews-comment-input">
              <IonRow>
                <IonCol>
                  <GInput
                    label="New comment"
                    type="text"
                    value={message?.value || ""}
                    onValueChange={onMessageChange}
                    textAreaRows={4}
                    error={message?.error}
                    textArea
                  />
                  <IonRow>
                    <IonButton
                      fill="outline"
                      onClick={onAddComment}
                      disabled={!onCanAddComment() || addCommentLoading}
                    >
                      Add
                    </IonButton>
                    <IonButton fill="outline" color="danger" onClick={onCancel}>
                      Cancel
                    </IonButton>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
        {showInput?.parentId === parentId &&
        (showInput.show || showInput.update) ? null : (
          <IonButtons>
            <IonButton
              size="small"
              onClick={() => onShowInput(parentComment.id)}
              disabled={addCommentLoading}
            >
              <IonIcon
                className="reply-icon"
                icon={returnUpBackOutline}
              ></IonIcon>
            </IonButton>
            <IonButton
              size="small"
              onClick={() => onShowInput(parentComment.id, parentComment.id)}
              disabled={addCommentLoading}
            >
              <IonIcon className="update-icon" icon={pencilOutline}></IonIcon>
            </IonButton>
            <IonButton
              size="small"
              onClick={() => onIsDeleteOpen(parentComment.id, true)}
            >
              <IonIcon className="delete-icon" icon={trashOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        )}
        {getReplies(parentId).map((parentChildComment) => {
          if ((parentChildComment.children?.length || 0) > 0) {
            return parentChildComment.children?.map((childComment) => {
              return (
                <div
                  key={parentId + "-" + childComment.id}
                  className="reply-comment"
                >
                  {children &&
                    children({
                      parentComment: childComment,
                      parentId: childComment.id,
                      getReplies,
                      children,
                    })}
                </div>
              );
            });
          }

          return null;
        })}
      </IonCard>

      {isDeleteOpen?.show && (
        <DeleteComment
          commentId={isDeleteOpen.commentId}
          onIsDeleteOpen={onIsDeleteOpen}
        />
      )}
    </>
  );
};
