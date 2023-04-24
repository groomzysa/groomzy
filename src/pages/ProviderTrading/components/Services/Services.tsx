import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { Service } from "./components";
import { PAGE_SIZE } from "./constants";
import { useServicesHandlers } from "./hooks";

export const Services: FC = () => {
  const { id } = useParams<{ id: string }>();

  /**
   *
   * Custom hooks
   *
   */
  const {
    services,
    cursor,
    servicesError,
    servicesHasError,
    servicesLoading,
    fetchServicesData,
    refetchServicesHandler,
  } = useServicesHandlers();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Services</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Services</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" onIonRefresh={refetchServicesHandler}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonLoading isOpen={servicesLoading} />

        <IonGrid>
          {servicesHasError && (
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <span className="error">{servicesError}</span>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
          )}
          <IonRow>
            {services?.map((service) => {
              return (
                <IonCol key={service.id} sizeXs="12" sizeSm="6" sizeMd="3">
                  <Service service={service} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            fetchServicesData({
              providerId: Number(id),
              limit: PAGE_SIZE,
              cursor,
            });
            setTimeout(() => ev.target.complete(), 1000);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};
