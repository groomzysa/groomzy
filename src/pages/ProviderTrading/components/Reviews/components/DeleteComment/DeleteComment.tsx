import { FC } from "react";
import { IDeleteCommentProps } from "./types";
import "./styles.css";
import { useDeleteComment } from "./hooks";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonList,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { DELETE_COMMENT_MESSAGE } from "../../../../../../utils/messages";

export const DeleteComment: FC<IDeleteCommentProps> = ({
  commentId,
  onIsDeleteOpen,
}) => {
  /**
   *
   * Hooks
   *
   */
  const { isOpen, deleteCommentLoading, onDeleteComment, onCloseModal } =
    useDeleteComment(onIsDeleteOpen);

  return (
    <IonModal
      isOpen={isOpen}
      backdropDismiss={false}
      className="delete-comment-modal"
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Delete comment</IonTitle>
          <IonIcon
            slot="end"
            className="close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>
        <IonList>
          <div className="message">
            <IonText>{DELETE_COMMENT_MESSAGE}</IonText>
          </div>
          <IonButtons>
            <IonButton
              fill="outline"
              color="primary"
              onClick={() => onDeleteComment(commentId)}
              disabled={deleteCommentLoading}
            >
              {deleteCommentLoading ? "Deleting..." : "Delete"}
            </IonButton>
            <IonButton
              fill="outline"
              color="danger"
              onClick={onCloseModal}
              disabled={deleteCommentLoading}
            >
              Cancel
            </IonButton>
          </IonButtons>
        </IonList>
      </IonContent>
    </IonModal>
  );
};
