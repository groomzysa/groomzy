import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonRefresher,
  IonRefresherContent,
  IonRow,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import { FC } from "react";
import { GInput } from "../../../../../../components";
import { useTradingInfo } from "./hooks";
import "./styles.css";

export const TradingInfo: FC = () => {
  const {
    provider,
    tradingName,
    phoneNumber,
    photo,
    addTradingInfoLoading,
    updateTradingInfoLoading,
    isKeyboardOpen,
    topToolBarHeight,
    bottomToolBarHeight,
    onTradingNameChange,
    onPhoneNumberChange,
    onAddTradingInfo,
    onUpdateTradingInfo,
    takePhoto,
    onRefetchTradingInfo,
  } = useTradingInfo();
  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={onRefetchTradingInfo}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonGrid
        class="trading-info-main-content"
        style={{
          height: isKeyboardOpen
            ? `calc(100vh - ${topToolBarHeight}px)`
            : `calc(100vh - ${topToolBarHeight}px - ${bottomToolBarHeight}px - 20px)`,
        }}
      >
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <GInput
              label="Trading name"
              labelPosition={provider ? "stacked" : "floating"}
              value={tradingName?.value || ""}
              placeholder={provider?.tradingName || ""}
              onValueChange={onTradingNameChange}
              type="text"
              error={tradingName?.error}
            />
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <GInput
              label="Phone number"
              labelPosition={provider ? "stacked" : "floating"}
              value={phoneNumber?.value || ""}
              placeholder={provider?.phone || ""}
              onValueChange={onPhoneNumberChange}
              type={"text"}
              error={phoneNumber?.error}
            />
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <div className="take-photo-button" onClick={takePhoto}>
                    <IonIcon icon={cameraOutline}></IonIcon>
                    <span>Take a picture</span>
                  </div>
                </IonCol>
              </IonRow>
              {photo && (
                <IonRow>
                  <IonCol size="6">
                    <IonImg src={photo.webviewPath} />
                  </IonCol>
                </IonRow>
              )}
            </IonGrid>
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <IonButton
              onClick={
                provider
                  ? () => onUpdateTradingInfo()
                  : () => onAddTradingInfo()
              }
              disabled={updateTradingInfoLoading || addTradingInfoLoading}
            >
              {provider
                ? updateTradingInfoLoading
                  ? "Updating..."
                  : "Update"
                : addTradingInfoLoading
                ? "Adding..."
                : "Add details"}
            </IonButton>
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};
