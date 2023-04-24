import {
  IonBackButton,
  IonButton,
  IonButtons,
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
import { PASSWORD_RESET } from "../../utils/pages";
import { usePasswordReset } from "./hooks";
import { GInput } from "../../components";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import "./styles.css";

export const PasswordReset: FC = () => {
  const {
    password,
    passwordResetOTP,
    showPassword,
    isKeyboardOpen,
    topToolBarHeight,
    resetPasswordLoading,
    onPasswordChange,
    onPasswordResetOTPChange,
    onShowPassword,
    onCanResetPassword,
    onResetPassword,
  } = usePasswordReset();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{PASSWORD_RESET}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <form>
          <IonGrid
            class="reset-password-main-content"
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
                  label="Password reset OTP"
                  value={passwordResetOTP?.value || ""}
                  onValueChange={onPasswordResetOTPChange}
                  type={"text"}
                  error={passwordResetOTP?.error}
                />
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>

            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <GInput
                  label="Password"
                  value={password?.value || ""}
                  onValueChange={onPasswordChange}
                  type={showPassword ? "text" : "password"}
                  iconName={showPassword ? eyeOffOutline : eyeOutline}
                  iconSlot="end"
                  iconClass="icon"
                  iconAction={onShowPassword}
                  error={password?.error}
                />
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>

            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <IonButton
                  onClick={onResetPassword}
                  disabled={resetPasswordLoading || !onCanResetPassword()}
                >
                  {resetPasswordLoading ? "Loading..." : "Reset password"}
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
