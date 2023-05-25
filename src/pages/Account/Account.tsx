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
import { useAccount } from "./hooks";
import "./styles.css";
import { AccountAddress, AccountInfo } from "./components";
import { IAccountProps } from "./types";

export const Account: FC<IAccountProps> = ({ user }) => {
  const { displayedContent, onDisplayContentChanged } = useAccount();
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

      <IonContent>
        {displayedContent === "info" && <AccountInfo user={user} />}
        {displayedContent === "address" && <AccountAddress user={user} />}
      </IonContent>
    </IonPage>
  );
};
