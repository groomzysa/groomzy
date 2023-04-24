import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";

import { useDetailsHandlers } from "./hooks";
import { TradingAddress, TradingInfo } from "./components";
export const Details: FC = () => {
  /**
   *
   * Hooks
   *
   */
  const { displayedContent, onDisplayContentChanged } = useDetailsHandlers();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonSegment value={displayedContent}>
            <IonSegmentButton
              value="info"
              onClick={() => onDisplayContentChanged("info")}
            >
              <IonLabel>Info</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="address"
              onClick={() => onDisplayContentChanged("address")}
            >
              <IonLabel>Address</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {displayedContent === "info" && <TradingInfo />}
        {displayedContent === "address" && <TradingAddress />}
      </IonContent>
    </IonPage>
  );
};
