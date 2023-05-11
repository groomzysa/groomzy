import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButtons,
  IonButton,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { FC } from "react";
import { closeOutline } from "ionicons/icons";
import "./styles.css";
import { GInput } from "../../../../../../components";
import { useUpdateStaff } from "./hooks";
import { IUpdateStaffProps } from "./types";

export const UpdateStaff: FC<IUpdateStaffProps> = ({ gridRef }) => {
  /**
   *
   * Custom hooks
   *
   */

  const {
    firstName,
    lastName,
    updateStaffLoading,
    staff,
    staffLoading,
    isOpen,
    onFirstNameChange,
    onLastNameChange,
    onUpdateStaff,
    onCloseModal,
  } = useUpdateStaff(gridRef);

  return (
    <IonModal
      isOpen={isOpen}
      backdropDismiss={false}
      className="update-staff-modal"
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Update staff</IonTitle>
          <IonIcon
            slot="end"
            className="update-staff-close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>

        {staffLoading ? (
          <IonSpinner
            color="primary"
            class="ion-justify-content-center"
          ></IonSpinner>
        ) : (
          <form>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <GInput
                    label="First name"
                    labelPosition={staff ? "stacked" : "floating"}
                    onValueChange={onFirstNameChange}
                    type="text"
                    value={firstName?.value || ""}
                    placeholder={staff?.firstName || ""}
                  />
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <GInput
                    label="Last name"
                    labelPosition={staff ? "stacked" : "floating"}
                    onValueChange={onLastNameChange}
                    type="number"
                    value={lastName?.value || ""}
                    placeholder={staff?.lastName || ""}
                  />
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonButtons>
                    <IonButton
                      fill="outline"
                      color="primary"
                      onClick={onUpdateStaff}
                      disabled={updateStaffLoading}
                    >
                      {updateStaffLoading ? "Updating..." : "Update"}
                    </IonButton>
                    <IonButton
                      fill="outline"
                      color="danger"
                      onClick={onCloseModal}
                      disabled={updateStaffLoading}
                    >
                      Cancel
                    </IonButton>
                  </IonButtons>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        )}
      </IonContent>
    </IonModal>
  );
};
