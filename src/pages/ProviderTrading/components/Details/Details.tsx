import {
  IonAvatar,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
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
import { personCircleOutline } from "ionicons/icons";
export const Details: FC = () => {
  /**
   *
   * Custom hooks
   *
   */
  const { provider, providerLoading, mapRef } = useDetailsHandlers();

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
          <IonRow>
            <IonCol>
              <capacitor-google-map
                ref={mapRef}
                id="map"
              ></capacitor-google-map>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeXs="12" sizeMd="6">
              <IonRow>
                <IonCol>
                  <IonNote className="time-header">Business times</IonNote>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
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
              </IonRow>
            </IonCol>
            <IonCol sizeXs="12" sizeMd="6">
              <IonRow>
                <IonCol>
                  <IonNote className="staffs-header">Staffs</IonNote>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  {provider?.staffs?.map((staff) => {
                    const { id, firstName } = staff;
                    return (
                      <IonRow key={id}>
                        <IonCol>
                          <div className="staff-container">
                            <IonAvatar className="avater">
                              <IonIcon
                                className="avatr-icon"
                                icon={personCircleOutline}
                              ></IonIcon>
                            </IonAvatar>
                            <IonNote className="staff-name">
                              {firstName}
                            </IonNote>
                          </div>
                        </IonCol>
                      </IonRow>
                    );
                  })}
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
