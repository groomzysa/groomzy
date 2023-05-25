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
import { SIGN_UP } from "../../utils/pages";
import { useSignUp } from "./hooks";

import "./styles.css";

export const SignUp: FC = () => {
  /**
   *
   * Custom hooks
   *
   */

  const {
    addUserLoading,
    email,
    firstName,
    isProvider,
    lastName,
    password,
    showPassword,
    isKeyboardOpen,
    onAddUser,
    onEmailChange,
    onFirstNameChange,
    onIsProvider,
    onLastNameChange,
    onPasswordChange,
    onShowPassword,
    onNavigateToSignUp,
    onCanSignUp,
  } = useSignUp();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{SIGN_UP}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form
          className={
            isKeyboardOpen ? "sign-up-form-keyboard-on" : "sign-up-form"
          }
        >
          <IonGrid>
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <div className="sign-up-names-container">
                  <div className="sign-up-first-name">
                    <GInput
                      label="First name"
                      value={firstName?.value || ""}
                      onValueChange={onFirstNameChange}
                      type="text"
                      error={firstName?.error}
                      required
                    />
                  </div>

                  <div className="sign-up-lastname">
                    <GInput
                      label="Last name"
                      value={lastName?.value || ""}
                      onValueChange={onLastNameChange}
                      type="text"
                      error={lastName?.error}
                      required
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
                <IonButton
                  onClick={onAddUser}
                  disabled={addUserLoading || !onCanSignUp()}
                >
                  {addUserLoading ? "Loading..." : "Sign up"}
                </IonButton>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>

            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <IonText
                  onClick={onNavigateToSignUp}
                  className="sign-up-existing-member"
                >
                  Already signed up?
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
