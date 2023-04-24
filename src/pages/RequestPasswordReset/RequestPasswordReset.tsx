import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { REQUEST_PASSWORD_RESET } from "../../utils/pages";
import { GInput } from "../../components";
import { useRequestPasswordReset } from "./hooks";
import "./styles.css";

export const RequestPasswordReset: FC = () => {
  const {
    email,
    isProvider,
    isKeyboardOpen,
    topToolBarHeight,
    requestPasswordResetLoading,
    onEmailChange,
    onIsProvider,
    onRequestPasswordReset,
    onCanRequestPasswordReset,
  } = useRequestPasswordReset();
  console.log(requestPasswordResetLoading);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{REQUEST_PASSWORD_RESET}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <form>
          <IonGrid
            class="request-reset-password-main-content"
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
                  label="Email"
                  value={email?.value || ""}
                  onValueChange={onEmailChange}
                  type="email"
                  error={email?.error}
                />
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <IonCheckbox
                  labelPlacement="end"
                  checked={isProvider}
                  onIonChange={onIsProvider}
                >
                  Service Provider?
                </IonCheckbox>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>

            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <IonButton
                  onClick={onRequestPasswordReset}
                  disabled={
                    requestPasswordResetLoading || !onCanRequestPasswordReset()
                  }
                >
                  {requestPasswordResetLoading
                    ? "Loading..."
                    : "Request password change"}
                </IonButton>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};
