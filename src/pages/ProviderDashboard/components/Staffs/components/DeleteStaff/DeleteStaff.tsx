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
import { useDeleteStaff } from "./hooks";
import { IDeleteStaffProps } from "./types";
import { DELETE_STAFF_MESSAGE } from "../../../../../../utils/messages";

export const DeleteStaff: FC<IDeleteStaffProps> = ({ gridRef }) => {
  /**
   *
   * Custom hooks
   *
   */

  const { isOpen, deleteStaffLoading, onDeleteStaff, onCloseModal } =
    useDeleteStaff(gridRef);

  return (
    <IonModal
      isOpen={isOpen}
      backdropDismiss={false}
      className="delete-staff-modal"
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Delete staff</IonTitle>
          <IonIcon
            slot="end"
            className="close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>
        <IonList>
          <div className="message">
            <IonText>{DELETE_STAFF_MESSAGE}</IonText>
          </div>
          <IonButtons>
            <IonButton
              fill="outline"
              color="primary"
              onClick={onDeleteStaff}
              disabled={deleteStaffLoading}
            >
              {deleteStaffLoading ? "Deleting..." : "Delete"}
            </IonButton>
            <IonButton
              fill="outline"
              color="danger"
              onClick={onCloseModal}
              disabled={deleteStaffLoading}
            >
              Cancel
            </IonButton>
          </IonButtons>
        </IonList>
      </IonContent>
    </IonModal>
  );
};
