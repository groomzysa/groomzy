import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { HOME } from "../../utils/pages";
import { ServiceProviders, ServiceProvidersSearch } from "./components";
import { useHomeExplorer } from "./hooks";

export const HomeExplorer: FC = () => {
  /**
   *
   * Hooks
   *
   */
  const { hasProviders } = useHomeExplorer();
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
        {hasProviders && <ServiceProvidersSearch />}
        <ServiceProviders />
      </IonContent>
    </IonPage>
  );
};
