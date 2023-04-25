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
import { ServiceProviders } from "./components";

export const HomeExplorer: FC = () => {
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
        <ServiceProviders />
      </IonContent>
    </IonPage>
  );
};
