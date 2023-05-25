import { IonItem, IonLabel, IonText } from "@ionic/react";
import { FC } from "react";
import { IViewServiceItemProps } from "./types";
import "./styles.css";

export const ViewServiceItem: FC<IViewServiceItemProps> = ({
  label,
  text,
  isDescription,
}) => {
  return (
    <IonItem lines="none">
      <IonLabel slot="start" className="label-title">
        {label}:
      </IonLabel>
      {isDescription ? (
        <IonText className="description">{text}</IonText>
      ) : (
        <IonText>{text}</IonText>
      )}
    </IonItem>
  );
};
