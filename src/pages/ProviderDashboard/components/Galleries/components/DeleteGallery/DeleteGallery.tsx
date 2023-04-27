import { FC } from "react";
import { IDeleteGalleryProps } from "./types";
import "./styles.css";
import { useDeleteGallery } from "./hooks";
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
import { DELETE_GALLERY_MESSAGE } from "../../../../../../utils/messages";

export const DeleteGallery: FC<IDeleteGalleryProps> = ({ gridRef }) => {
  /**
   *
   * Hooks
   *
   */
  const { isOpen, deleteGalleryLoading, onCloseModal, onDeleteGallery } =
    useDeleteGallery(gridRef);

  return (
    <IonModal
      isOpen={isOpen}
      backdropDismiss={false}
      className="delete-gallery-modal"
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Delete gallery</IonTitle>
          <IonIcon
            slot="end"
            className="close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>
        <IonList>
          <div className="message">
            <IonText>{DELETE_GALLERY_MESSAGE}</IonText>
          </div>
          <IonButtons>
            <IonButton
              fill="outline"
              color="primary"
              onClick={onDeleteGallery}
              disabled={deleteGalleryLoading}
            >
              {deleteGalleryLoading ? "Deleting..." : "Delete"}
            </IonButton>
            <IonButton
              fill="outline"
              color="danger"
              onClick={onCloseModal}
              disabled={deleteGalleryLoading}
            >
              Cancel
            </IonButton>
          </IonButtons>
        </IonList>
      </IonContent>
    </IonModal>
  );
};
