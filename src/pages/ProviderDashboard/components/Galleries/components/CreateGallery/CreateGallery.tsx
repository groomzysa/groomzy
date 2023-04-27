import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { ICreateGalleryProps } from "./types";
import { useCreateGallery } from "./hooks";
import { cameraOutline, closeOutline } from "ionicons/icons";
import { GInput } from "../../../../../../components";
import "./styles.css";

export const CreateGallery: FC<ICreateGalleryProps> = ({ gridRef }) => {
  /**
   *
   * Hooks
   *
   */
  const {
    isOpen,
    name,
    photo,
    createGalleryLoading,
    takePhoto,
    onCloseModal,
    onNameChange,
    onCanCreateGallery,
    onCreateGallery,
  } = useCreateGallery(gridRef);
  return (
    <IonModal
      className="create-gallery-modal"
      isOpen={isOpen}
      backdropDismiss={false}
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Create gallery</IonTitle>
          <IonIcon
            slot="end"
            className="create-gallery-close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol>
              <GInput
                label="Name"
                labelPosition="floating"
                onValueChange={onNameChange}
                type="text"
                value={name?.value || ""}
                error={name?.error}
                required
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div
                className="create-gallery-take-photo-button"
                onClick={takePhoto}
              >
                <IonIcon icon={cameraOutline}></IonIcon>
                <span>Take a picture</span>
              </div>
            </IonCol>
          </IonRow>
          {photo && (
            <IonRow>
              <IonCol size="6">
                <IonImg src={photo.webviewPath} />
              </IonCol>
            </IonRow>
          )}

          <IonRow>
            <IonCol>
              <IonButtons>
                <IonButton
                  fill="outline"
                  color="primary"
                  onClick={onCreateGallery}
                  disabled={!onCanCreateGallery() || createGalleryLoading}
                >
                  {createGalleryLoading ? "Creating..." : "Create"}
                </IonButton>
                <IonButton
                  fill="outline"
                  color="danger"
                  onClick={onCloseModal}
                  disabled={createGalleryLoading}
                >
                  Cancel
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};
