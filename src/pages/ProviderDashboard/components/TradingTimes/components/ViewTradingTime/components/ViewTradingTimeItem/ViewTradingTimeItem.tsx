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
      <IonLabel className="label-title">{label}:</IonLabel>
      {isDescription ? (
        <div className="description">{text}</div>
      ) : (
        <IonLabel>{text}</IonLabel>
      )}
    </IonItem>
  );
};
