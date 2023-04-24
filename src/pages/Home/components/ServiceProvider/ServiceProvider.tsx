import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import { FC } from "react";
import { addressName } from "../../../../utils/address";
import { useServiceProviderHandlers } from "./hooks";

import "./styles.css";
import { IServiceProviderProps } from "./types";

export const ServiceProvider: FC<IServiceProviderProps> = ({ provider }) => {
  const { tradingName, addresses } = provider;

  /**
   *
   * Custom hooks
   *
   */
  const { navigateToProviderTrading } = useServiceProviderHandlers();

  return (
    <IonCard class="card">
      <div className="media-img-container">
        <img
          loading="lazy"
          alt={provider.tradingName ? provider.tradingName : "Service Provider"}
          src={
            provider.logoUrl
              ? provider.logoUrl
              : "https://ionicframework.com/docs/img/demos/card-media.png"
          }
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <IonCardContent>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol sizeXs="8">
              <IonText className="title">{tradingName}</IonText>
            </IonCol>
            <IonCol
              sizeXs="4"
              className="ion-justify-content-end view-button-col"
            >
              <IonButton
                size="small"
                onClick={() =>
                  navigateToProviderTrading(provider.id.toString())
                }
              >
                View
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow></IonRow>
          {addresses && addresses.length > 0 && (
            <IonRow>
              <IonCol className="address">
                <IonText>{addressName(addresses[0])}</IonText>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
