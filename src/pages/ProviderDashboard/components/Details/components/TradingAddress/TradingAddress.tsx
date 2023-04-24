import {
  IonButton,
  IonCol,
  IonGrid,
  IonRefresher,
  IonRefresherContent,
  IonRow,
} from "@ionic/react";
import { FC } from "react";
import { GInput } from "../../../../../../components";
import { useTradingAddress } from "./hooks";
import "./styles.css";

export const TradingAddress: FC = () => {
  const {
    providerAddress,
    addTradingAddressLoading,
    areaCode,
    cityName,
    provinceName,
    streetName,
    streetNumber,
    townName,
    updateTradingAddressLoading,
    isKeyboardOpen,
    topToolBarHeight,
    bottomToolBarHeight,
    onAddTradingAddress,
    onAreaCodeChanged,
    onCityNameChanged,
    onProvinceNameChanged,
    onStreetNameChanged,
    onStreetNumberChanged,
    onTownNameChanged,
    onUpdateTradingAddress,
    onRefetchTradingAddress,
  } = useTradingAddress();

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={onRefetchTradingAddress}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonGrid
        class="trading-address-main-content"
        style={{
          height: isKeyboardOpen
            ? `calc(100vh - ${topToolBarHeight}px)`
            : `calc(100vh - ${topToolBarHeight}px - ${bottomToolBarHeight}px - 20px)`,
        }}
      >
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <div className="trading-address-street-name-container">
              <div className="trading-address-street-number">
                <GInput
                  label="Street number"
                  labelPosition={providerAddress ? "stacked" : "floating"}
                  value={streetNumber?.value || ""}
                  placeholder={providerAddress?.streetNumber || ""}
                  onValueChange={onStreetNumberChanged}
                  type="text"
                  error={streetNumber?.error}
                />
              </div>
              <div className="trading-address-street-name">
                <GInput
                  label="Street name"
                  labelPosition={providerAddress ? "stacked" : "floating"}
                  value={streetName?.value || ""}
                  placeholder={providerAddress?.streetName || ""}
                  onValueChange={onStreetNameChanged}
                  type="text"
                  error={streetName?.error}
                />
              </div>
            </div>
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <GInput
              label="Town / Suburb name"
              labelPosition={providerAddress ? "stacked" : "floating"}
              value={townName?.value || ""}
              placeholder={providerAddress?.town || ""}
              onValueChange={onTownNameChanged}
              type="text"
              error={townName?.error}
            />
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <GInput
              label="City name"
              labelPosition={providerAddress ? "stacked" : "floating"}
              value={cityName?.value || ""}
              placeholder={providerAddress?.city || ""}
              onValueChange={onCityNameChanged}
              type="text"
              error={cityName?.error}
            />
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <GInput
              label="Province name"
              labelPosition={providerAddress ? "stacked" : "floating"}
              value={provinceName?.value || ""}
              placeholder={providerAddress?.province || ""}
              onValueChange={onProvinceNameChanged}
              type="text"
              error={provinceName?.error}
            />
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <GInput
              label="Area code"
              labelPosition={providerAddress ? "stacked" : "floating"}
              value={areaCode?.value || ""}
              placeholder={providerAddress?.areaCode || ""}
              onValueChange={onAreaCodeChanged}
              type="text"
              error={areaCode?.error}
            />
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <IonRow>
              <IonButton
                onClick={
                  providerAddress
                    ? () => onUpdateTradingAddress()
                    : () => onAddTradingAddress()
                }
                disabled={
                  updateTradingAddressLoading || addTradingAddressLoading
                }
              >
                {providerAddress
                  ? updateTradingAddressLoading
                    ? "Updating..."
                    : "Update"
                  : addTradingAddressLoading
                  ? "Adding..."
                  : "Add"}
              </IonButton>
            </IonRow>
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};
