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
import { useDeleteService } from "./hooks";
import { IDeleteServiceProps } from "./types";

export const DeleteService: FC<IDeleteServiceProps> = ({ gridRef }) => {
  /**
   *
   * Custom hooks
   *
   */

  const { isOpen, deleteServiceLoading, onDeleteService, onCloseModal } =
    useDeleteService(gridRef);

  return (
    <IonModal
      isOpen={isOpen}
      backdropDismiss={false}
      className="delete-service-modal"
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Delete service</IonTitle>
          <IonIcon
            slot="end"
            className="close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>
        <IonList>
          <div className="message">
            <IonText>Are you sure you want to delete this service?</IonText>
          </div>
          <IonButtons>
            <IonButton
              fill="outline"
              color="primary"
              onClick={onDeleteService}
              disabled={deleteServiceLoading}
            >
              {deleteServiceLoading ? "Deleting..." : "Delete"}
            </IonButton>
            <IonButton
              fill="outline"
              color="danger"
              onClick={onCloseModal}
              disabled={deleteServiceLoading}
            >
              Cancel
            </IonButton>
          </IonButtons>
        </IonList>
      </IonContent>
    </IonModal>
  );
};
