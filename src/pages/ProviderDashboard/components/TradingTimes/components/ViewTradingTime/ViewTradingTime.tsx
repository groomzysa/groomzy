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
import { ViewTradingTimeItem } from "./components";
import "./styles.css";
import { useViewTradingTime } from "./hooks";

export const ViewTradingTime: FC = () => {
  const { operatingTimeLoading, operatingTime, isOpen, onCloseModal } =
    useViewTradingTime();

  return (
    <IonModal
      isOpen={isOpen}
      className="view-trading-time-modal"
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
        {operatingTimeLoading ? (
          <IonSpinner
            color="primary"
            class="ion-justify-content-center"
          ></IonSpinner>
        ) : (
          <IonList>
            <ViewTradingTimeItem label="Day" text={operatingTime?.day || ""} />
            <ViewTradingTimeItem
              label="Opens"
              text={operatingTime?.opens || ""}
            />
            <ViewTradingTimeItem
              label="Closes"
              text={operatingTime?.closes || ""}
            />
          </IonList>
        )}
      </IonContent>
    </IonModal>
  );
};
