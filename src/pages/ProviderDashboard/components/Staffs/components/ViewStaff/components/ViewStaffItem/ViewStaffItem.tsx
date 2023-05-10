import { IonItem, IonLabel, IonText } from "@ionic/react";
import { FC } from "react";
import { IViewStaffItemProps } from "./types";
import "./styles.css";

export const ViewStaffItem: FC<IViewStaffItemProps> = ({ label, text }) => {
  return (
    <IonItem lines="none">
      <IonLabel slot="start" class="label-title">
        {label}:
      </IonLabel>

      <IonText>{text}</IonText>
    </IonItem>
  );
};
