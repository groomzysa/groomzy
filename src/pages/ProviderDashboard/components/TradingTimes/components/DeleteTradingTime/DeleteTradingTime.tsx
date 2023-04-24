import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButtons,
  IonButton,
  IonList,
  IonText,
} from "@ionic/react";
import { FC } from "react";
import { closeOutline } from "ionicons/icons";
import "./styles.css";
import { useDeleteTradingTime } from "./hooks";
import { IDeleteTradingTimeProps } from "./types";

export const DeleteTradingTime: FC<IDeleteTradingTimeProps> = ({ gridRef }) => {
  /**
   *
   * Custom hooks
   *
   */

  const {
    isOpen,
    deleteOperatingTimeLoading,
    onDeleteOperatingTime,
    onCloseModal,
  } = useDeleteTradingTime(gridRef);

  return (
    <IonModal
      isOpen={isOpen}
      backdropDismiss={false}
      className="delete-trading-time-modal"
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Delete trading time</IonTitle>
          <IonIcon
            slot="end"
            className="close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>
        <IonList>
          <div className="message">
            <IonText>
              Are you sure you want to delete this trading time?
            </IonText>
          </div>
          <IonButtons>
            <IonButton
              fill="outline"
              color="primary"
              onClick={onDeleteOperatingTime}
              disabled={deleteOperatingTimeLoading}
            >
              {deleteOperatingTimeLoading ? "Deleting..." : "Delete"}
            </IonButton>
            <IonButton
              fill="outline"
              color="danger"
              onClick={onCloseModal}
              disabled={deleteOperatingTimeLoading}
            >
              Cancel
            </IonButton>
          </IonButtons>
        </IonList>
      </IonContent>
    </IonModal>
  );
};
