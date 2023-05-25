import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { FC } from "react";
import { GInput } from "../../components";
import { SIGN_IN } from "../../utils/pages";
import { useSignIn } from "./hooks";

import "./styles.css";

export const SignIn: FC = () => {
  /**
   *
   * Custom hooks
   *
   */

  const {
    email,
    isProvider,
    password,
    showPassword,
    signInLoading,
    isKeyboardOpen,
    onEmailChange,
    onForgotPassword,
    onIsProvider,
    onPasswordChange,
    onShowPassword,
    onSignIn,
    onNewMember,
    onCanSignIn,
  } = useSignIn();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{SIGN_IN}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form
          className={
            isKeyboardOpen ? "sign-in-form-keyboard-on" : "sign-in-form"
          }
        >
          <IonGrid>
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <GInput
                  label="Email"
                  value={email?.value || ""}
                  onValueChange={onEmailChange}
                  type="email"
                  error={email?.error}
                  required
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
                  required
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
                <IonRow className="ion-align-items-baseline sign-in-space-between">
                  <IonButton
                    onClick={onSignIn}
                    disabled={signInLoading || !onCanSignIn()}
                  >
                    {signInLoading ? "Loading..." : "Sign in"}
                  </IonButton>

                  <IonText
                    onClick={onForgotPassword}
                    className="sign-in-forgot-password"
                  >
                    Forgot password?
                  </IonText>
                </IonRow>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>

            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <IonText onClick={onNewMember} className="sign-in-new-member">
                  Not yet signed up?
                </IonText>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};
