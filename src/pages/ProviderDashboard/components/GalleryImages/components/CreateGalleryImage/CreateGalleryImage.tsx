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
import { ICreateGalleryImageProps } from "./types";
import { useCreateGalleryImage } from "./hooks";
import { cameraOutline, closeOutline } from "ionicons/icons";
import { GInput } from "../../../../../../components";
import "./styles.css";

export const CreateGalleryImage: FC<ICreateGalleryImageProps> = ({
  gridRef,
}) => {
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
    isKeyboardOpen,
    takePhoto,
    onCloseModal,
    onNameChange,
    onCanCreateGallery,
    onCreateGallery,
  } = useCreateGalleryImage(gridRef);
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
        <form
          className={
            isKeyboardOpen
              ? "create-gallery-form-keyboard-on"
              : "create-gallery-form"
          }
        >
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
                  <span>Upload gallery image</span>
                </div>
              </IonCol>
            </IonRow>
            {photo && (
              <IonRow>
                <IonCol size="6">
                  <IonImg
                    className="create-gallery-photo-preview"
                    src={photo.webviewPath}
                  />
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
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
        </form>
      </IonContent>
    </IonModal>
  );
};
