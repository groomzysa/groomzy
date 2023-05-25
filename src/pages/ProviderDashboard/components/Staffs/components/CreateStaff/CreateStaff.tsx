import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButtons,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import { FC } from "react";
import { closeOutline } from "ionicons/icons";
import "./styles.css";
import { GInput } from "../../../../../../components";
import { useCreateStaff } from "./hooks";
import { ICreateStaffProps } from "./types";

export const CreateStaff: FC<ICreateStaffProps> = ({ gridRef }) => {
  /**
   *
   * Custom hooks
   *
   */

  const {
    firstName,
    lastName,
    createStaffLoading,
    isOpen,
    isKeyboardOpen,
    onFirstNameChange,
    onLastNameChange,
    onCreateStaff,
    onCloseModal,
    onCanCreateStaff,
  } = useCreateStaff(gridRef);

  return (
    <IonModal
      className="create-staff-modal"
      isOpen={isOpen}
      backdropDismiss={false}
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Create staff</IonTitle>
          <IonIcon
            slot="end"
            className="create-staff-close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>
        <form
          className={
            isKeyboardOpen
              ? "create-staff-form-keyboard-on"
              : "create-staff-form"
          }
        >
          <IonGrid>
            <IonRow>
              <IonCol>
                <GInput
                  label="First name"
                  labelPosition="floating"
                  onValueChange={onFirstNameChange}
                  type="text"
                  value={firstName?.value || ""}
                  error={firstName?.error}
                  required
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <GInput
                  label="Last name"
                  labelPosition="floating"
                  onValueChange={onLastNameChange}
                  type="text"
                  value={lastName?.value || ""}
                  error={lastName?.error}
                  required
                />
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonButtons>
            <IonButton
              fill="outline"
              color="primary"
              onClick={onCreateStaff}
              disabled={!onCanCreateStaff() || createStaffLoading}
            >
              {createStaffLoading ? "Creating..." : "Create"}
            </IonButton>
            <IonButton
              fill="outline"
              color="danger"
              onClick={onCloseModal}
              disabled={createStaffLoading}
            >
              Cancel
            </IonButton>
          </IonButtons>
        </form>
      </IonContent>
    </IonModal>
  );
};
