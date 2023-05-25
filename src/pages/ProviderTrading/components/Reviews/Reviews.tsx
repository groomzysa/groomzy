import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonNote,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { GIconBackButton, GInput } from "../../../../components";
import { routes } from "../../../../route/routes";
import "./styles.css";
import { useReviews } from "./hooks";
import { Comment } from "../../../../api/graphql/api.schema";
import { Review } from "./components";

export const Reviews: FC = () => {
  const {
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
  } = useReviews();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <GIconBackButton route={routes.home.base.use()} />
          </IonButtons>
          <IonTitle>Reviews</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={() => {}}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {commentsLoading ? (
          <IonLoading isOpen={commentsLoading}></IonLoading>
        ) : (
          <IonGrid>
            {!showMessageInput && (
              <IonRow>
                <IonCol>
                  <IonButton
                    className="review-new-comment-btn"
                    onClick={onShowMessageInput}
                  >
                    New comment
                  </IonButton>
                </IonCol>
              </IonRow>
            )}
            {showMessageInput && (
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
            )}
            {(comments?.length || 0) === 0 && (
              <IonRow
                className={
                  showMessageInput
                    ? "reviews-empty-state-container-input"
                    : "reviews-empty-state-container"
                }
              >
                <IonCol>
                  <div className="reviews-empty-state">
                    <div>
                      <img
                        src="assets/empty-box.svg"
                        alt="Empty box"
                        height={200}
                      />
                    </div>
                    <div>
                      <IonNote>There are currently no comment added.</IonNote>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            )}
            {comments
              ?.filter((comment: Comment) => !comment.parent)
              .map((comment: Comment) => {
                const parentId = comment.id;
                return (
                  <IonRow key={parentId}>
                    <IonCol>
                      {
                        <Review
                          getReplies={getReplies}
                          parentComment={comment}
                          parentId={parentId}
                        >
                          {Review}
                        </Review>
                      }
                    </IonCol>
                  </IonRow>
                );
              })}
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};
