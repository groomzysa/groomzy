import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonNote,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { capitalize, sortBy } from "lodash";

import "./styles.css";
import { useDetailsHandlers } from "./hooks";
import { DAYS } from "./constants";
import { GIconBackButton } from "../../../../components";
import { routes } from "../../../../route/routes";
export const Details: FC = () => {
  /**
   *
   * Custom hooks
   *
   */
  const { provider, providerError, providerHasError, providerLoading, mapRef } =
    useDetailsHandlers();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <GIconBackButton route={routes.home.base.use()} />
          </IonButtons>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="provider-trading-ion-content">
        <IonRefresher slot="fixed" onIonRefresh={() => {}}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonLoading isOpen={providerLoading} />

        <IonGrid>
          {providerHasError && (
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <span className="error">{providerError}</span>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <capacitor-google-map
                ref={mapRef}
                id="map"
              ></capacitor-google-map>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeXs="0" sizeSm="2" sizeMd="3"></IonCol>
            <IonCol sizeXs="12" sizeSm="8" sizeMd="6">
              <IonRow>
                <IonCol>
                  <IonNote className="time-header">Day</IonNote>
                </IonCol>
                <IonCol>
                  <IonNote className="time-header">Times</IonNote>
                </IonCol>
              </IonRow>
            </IonCol>
            <IonCol sizeXs="0" sizeSm="2" sizeMd="3"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeXs="0" sizeSm="2" sizeMd="3"></IonCol>
            <IonCol sizeXs="12" sizeSm="8" sizeMd="6">
              {sortBy(provider?.operatingTimes || [], (operatingTime) => {
                return DAYS.indexOf(operatingTime.day!);
              }).map((operatingTime) => {
                const { day, opens, closes, id } = operatingTime;
                return (
                  <IonRow key={id}>
                    <IonCol>
                      <IonNote>{capitalize(day?.toString())}</IonNote>
                    </IonCol>
                    <IonCol>
                      <IonNote>{`${opens} - ${closes}`}</IonNote>
                    </IonCol>
                  </IonRow>
                );
              })}
            </IonCol>
            <IonCol sizeXs="0" sizeSm="2" sizeMd="3"></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
