import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from "@ionic/react";
import { FC } from "react";
import { IServiceProps } from "./types";
import "./styles.css";

export const Service: FC<IServiceProps> = ({ service }) => {
  const { name, price, description, duration, durationUnit } = service;
  return (
    <IonCard class="provider-trading-service-container">
      <IonCardContent class="provider-trading-service-content">
        <IonGrid>
          <IonRow>
            <IonCol>
              <span className="provider-trading-service-name">{name}</span>
            </IonCol>
            <IonCol class="provider-trading-service-price-container">
              <span>{`(R${price?.toFixed(2)})`}</span>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <span className="provider-trading-service-duration">
                {duration?.toFixed(2)}
              </span>
              <span>{durationUnit?.toLowerCase()}</span>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="provider-trading-service-description">
              <span>{description}</span>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
