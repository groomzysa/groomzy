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
import { useAccountInfo } from "./hooks";
import "./styles.css";
import { GInput } from "../../../../components";
import { IAccountInfoProps } from "./types";

export const AccountInfo: FC<IAccountInfoProps> = ({ user }) => {
  const {
    firstName,
    lastName,
    email,
    photo,
    updateAccountLoading,
    isKeyboardOpen,
    topToolBarHeight,
    onUpdateAccountInfo,
    takePhoto,
    onEmailChange,
    onFirstNameChange,
    onLastNameChange,
    onRefetchAccountInfo,
  } = useAccountInfo();
  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={onRefetchAccountInfo}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonGrid
        class="account-info-main-content"
        style={{
          height: isKeyboardOpen
            ? `calc(100vh - ${topToolBarHeight}px)`
            : `calc(100vh - ${topToolBarHeight}px - 20px)`,
        }}
      >
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <GInput
              label="First name"
              type="text"
              labelPosition={user?.firstName ? "stacked" : "floating"}
              value={firstName?.value || ""}
              placeholder={user?.firstName || ""}
              onValueChange={onFirstNameChange}
            />
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <GInput
              label="Last name"
              type="text"
              labelPosition={user?.lastName ? "stacked" : "floating"}
              value={lastName?.value || ""}
              placeholder={user?.lastName || ""}
              onValueChange={onLastNameChange}
            />
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
          <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
            <GInput
              label="Email"
              type="text"
              labelPosition={user?.email ? "stacked" : "floating"}
              value={email?.value || ""}
              placeholder={user?.email || ""}
              onValueChange={onEmailChange}
              error={email?.error}
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
                  <div
                    className="account-info-take-photo-button"
                    onClick={takePhoto}
                  >
                    <IonIcon icon={cameraOutline}></IonIcon>
                    <span>Upload your profile image</span>
                  </div>
                </IonCol>
              </IonRow>
              {photo && (
                <IonRow>
                  <IonCol size="6">
                    <IonImg
                      class="account-info-photo-preview"
                      src={photo.webviewPath}
                    />
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
              onClick={onUpdateAccountInfo}
              disabled={updateAccountLoading}
            >
              {updateAccountLoading ? "Updating..." : "Update"}
            </IonButton>
          </IonCol>
          <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};
