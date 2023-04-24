import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonMenuButton,
  IonNote,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { HOME } from "../../utils/pages";
import { ServiceProvider } from "./components";
import { useHomeExplorerHandlers } from "./hooks";

import "./styles.css";

export const HomeExplorer: FC = () => {
  /**
   *
   * Custom hooks
   *
   */
  const {
    search,
    providers,
    providersError,
    providersHasError,
    providersLoading,
    onSearchChange,
    onSearchClear,
    refetchProvidersHandler,
  } = useHomeExplorerHandlers();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{HOME}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refetchProvidersHandler}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonLoading isOpen={providersLoading} />

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSearchbar
                value={search}
                onIonInput={(ev) => onSearchChange(ev)}
                debounce={800}
                onIonClear={onSearchClear}
              />
            </IonCol>
          </IonRow>
          {providersHasError && (
            <IonRow>
              <IonCol>
                <IonNote color="danger">{providersError}</IonNote>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            {providers?.map((provider) => {
              return (
                <IonCol
                  key={provider.id}
                  sizeXs="12"
                  sizeSm="6"
                  sizeMd="4"
                  sizeLg="3"
                >
                  <ServiceProvider provider={provider} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
