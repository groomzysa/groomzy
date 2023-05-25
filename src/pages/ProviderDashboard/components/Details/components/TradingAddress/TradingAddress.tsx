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
      <form
        className={
          isKeyboardOpen
            ? "trading-address-form-keyboard-on"
            : "trading-address-form"
        }
      >
        <IonGrid>
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
                    error={providerAddress ? undefined : streetNumber?.error}
                    required={providerAddress ? false : true}
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
                    error={providerAddress ? undefined : streetName?.error}
                    required={providerAddress ? false : true}
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
                error={providerAddress ? undefined : townName?.error}
                required={providerAddress ? false : true}
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
                error={providerAddress ? undefined : cityName?.error}
                required={providerAddress ? false : true}
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
                error={providerAddress ? undefined : provinceName?.error}
                required={providerAddress ? false : true}
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
                error={providerAddress ? undefined : areaCode?.error}
                required={providerAddress ? false : true}
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
      </form>
    </>
  );
};
