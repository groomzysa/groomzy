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
import { ViewServiceItem } from "./components";
import "./styles.css";
import { useViewService } from "./hooks";

export const ViewService: FC = () => {
  const { serviceLoading, service, isOpen, onCloseModal } = useViewService();

  return (
    <IonModal
      isOpen={isOpen}
      className="view-service-modal"
      backdropDismiss={false}
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Service details</IonTitle>
          <IonIcon
            slot="end"
            className="close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>
        {serviceLoading ? (
          <IonSpinner
            color="primary"
            class="ion-justify-content-center"
          ></IonSpinner>
        ) : (
          <IonList>
            <ViewServiceItem label="Name" text={service?.name || ""} />
            <ViewServiceItem label="Category" text={service?.category || ""} />
            <ViewServiceItem
              label="Price"
              text={"R" + service?.price?.toFixed(2)}
            />
            <ViewServiceItem
              label="Duration"
              text={`${service?.duration?.toFixed(
                2
              )} ${service?.durationUnit?.toLowerCase()}`}
            />
            <ViewServiceItem
              label="Description"
              text={service?.description!}
              isDescription
            />
          </IonList>
        )}
      </IonContent>
    </IonModal>
  );
};
