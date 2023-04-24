import { IonItem, IonLabel } from "@ionic/react";
import { FC } from "react";
import { IViewTradingTimeItemProps } from "./types";
import "./styles.css";

export const ViewTradingTimeItem: FC<IViewTradingTimeItemProps> = ({
  label,
  text,
  isDescription,
}) => {
  return (
    <IonItem lines="none">
      <IonLabel class="label-title">{label}:</IonLabel>
      {isDescription ? (
        <div className="description">{text}</div>
      ) : (
        <IonLabel>{text}</IonLabel>
      )}
    </IonItem>
  );
};
