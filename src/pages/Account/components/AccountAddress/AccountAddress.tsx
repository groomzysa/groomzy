import {
  IonButton,
  IonCol,
  IonGrid,
  IonRefresher,
  IonRefresherContent,
  IonRow,
} from "@ionic/react";
import { FC } from "react";
import { useAccountAddress } from "./hooks";
import "./styles.css";
import { GInput } from "../../../../components";
import { IAccountAddressProps } from "./types";

export const AccountAddress: FC<IAccountAddressProps> = ({ user }) => {
  const {
    userAddress,
    addAccountAddressLoading,
    areaCode,
    cityName,
    provinceName,
    streetName,
    streetNumber,
    townName,
    updateAccountAddressLoading,
    topToolBarHeight,
    isKeyboardOpen,
    onAddAccountAddress,
    onAreaCodeChanged,
    onCityNameChanged,
    onProvinceNameChanged,
    onStreetNameChanged,
    onStreetNumberChanged,
    onTownNameChanged,
    onUpdateAccountAddress,
    onRefetchAccountAddress,
  } = useAccountAddress(user);

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={onRefetchAccountAddress}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonGrid
        class="account-address-main-content"
        style={{
          height: isKeyboardOpen
            ? `calc(100vh - ${topToolBarHeight}px)`
            : `calc(100vh - ${topToolBarHeight}px - 20px)`,
        }}
      >
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <div className="account-address-street-name-container">
              <div className="account-address-street-number">
                <GInput
                  label="Street number"
                  labelPosition={userAddress ? "stacked" : "floating"}
                  value={streetNumber?.value || ""}
                  placeholder={userAddress?.streetNumber || ""}
                  onValueChange={onStreetNumberChanged}
                  type="text"
                  error={streetNumber?.error}
                />
              </div>

              <div className="account-address-street-name">
                <GInput
                  label="Street name"
                  labelPosition={userAddress ? "stacked" : "floating"}
                  value={streetName?.value || ""}
                  placeholder={userAddress?.streetName || ""}
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
              labelPosition={userAddress ? "stacked" : "floating"}
              value={townName?.value || ""}
              placeholder={userAddress?.town || ""}
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
              labelPosition={userAddress ? "stacked" : "floating"}
              value={cityName?.value || ""}
              placeholder={userAddress?.city || ""}
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
              labelPosition={userAddress ? "stacked" : "floating"}
              value={provinceName?.value || ""}
              placeholder={userAddress?.province || ""}
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
              labelPosition={userAddress ? "stacked" : "floating"}
              value={areaCode?.value || ""}
              placeholder={userAddress?.areaCode || ""}
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
                  userAddress
                    ? () => onUpdateAccountAddress()
                    : () => onAddAccountAddress()
                }
                disabled={
                  updateAccountAddressLoading || addAccountAddressLoading
                }
              >
                {userAddress
                  ? updateAccountAddressLoading
                    ? "Updating..."
                    : "Update"
                  : addAccountAddressLoading
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
