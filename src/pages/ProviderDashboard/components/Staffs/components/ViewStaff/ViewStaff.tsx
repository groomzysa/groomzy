import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { FC } from "react";
import { closeOutline } from "ionicons/icons";
import { ViewStaffItem } from "./components";
import "./styles.css";
import { useViewStaff } from "./hooks";

export const ViewStaff: FC = () => {
  const { staffLoading, staff, isOpen, onCloseModal } = useViewStaff();

  return (
    <IonModal
      isOpen={isOpen}
      className="view-staff-modal"
      backdropDismiss={false}
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Staff details</IonTitle>
          <IonIcon
            slot="end"
            className="close-icon"
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
          <IonList>
            <ViewStaffItem label="First name" text={staff?.firstName || ""} />
            <ViewStaffItem label="Last name" text={staff?.lastName || ""} />
          </IonList>
        )}
      </IonContent>
    </IonModal>
  );
};
