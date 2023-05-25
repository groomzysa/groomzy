import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoFacebook, logoInstagram, logoTiktok } from "ionicons/icons";
import { FC } from "react";
import { GInput } from "../../components";
import { CONTACTS } from "../../utils/pages";
import { useContactMail } from "./hooks";
import "./styles.css";

export const Contacts: FC = () => {
  /**
   *
   * Hooks
   *
   */
  const {
    isKeyboardOpen,
    firstName,
    lastName,
    email,
    subject,
    message,
    contactMailLoading,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onSubjectChange,
    onMessageChange,
    onContactMail,
    onVisitSocial,
  } = useContactMail();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{CONTACTS}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form
          className={
            isKeyboardOpen ? "contacts-form-keyboard-on" : "contacts-form"
          }
        >
          <IonGrid>
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <div className="contacts-names-container">
                  <GInput
                    label="First name"
                    type="text"
                    value={firstName?.value || ""}
                    onValueChange={onFirstNameChange}
                    error={firstName?.error}
                    required
                  />
                  <GInput
                    label="Last name"
                    type="text"
                    value={lastName?.value || ""}
                    onValueChange={onLastNameChange}
                    error={lastName?.error}
                    required
                  />
                </div>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <GInput
                  label="Email"
                  type="email"
                  value={email?.value || ""}
                  onValueChange={onEmailChange}
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
                  label="Subject"
                  type="text"
                  value={subject?.value || ""}
                  onValueChange={onSubjectChange}
                  error={subject?.error}
                  required
                />
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <GInput
                  label="Message"
                  type="text"
                  value={message?.value || ""}
                  onValueChange={onMessageChange}
                  error={message?.error}
                  textAreaRows={5}
                  textArea
                  required
                />
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <IonButtons className="contacts-buttons">
                  <IonButton
                    color="primary"
                    fill="solid"
                    onClick={onContactMail}
                    disabled={contactMailLoading}
                  >
                    {contactMailLoading ? "Sending..." : "Send"}
                  </IonButton>
                </IonButtons>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
            <IonRow>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
              <IonCol sizeXs="10" sizeSm="8" sizeMd="6" sizeLg="4">
                <IonRow className="ion-justify-content-center">
                  <IonIcon
                    className="contacts-social-icon contacts-instagram-logo"
                    icon={logoInstagram}
                    onClick={() =>
                      onVisitSocial("https://instagram.com/groomzy_")
                    }
                  ></IonIcon>
                  <IonIcon
                    className="contacts-social-icon contacts-tiktok-logo"
                    icon={logoTiktok}
                    onClick={() =>
                      onVisitSocial("https://instagram.com/groomzy_")
                    }
                  ></IonIcon>
                  <IonIcon
                    className="contacts-social-icon contacts-facebook-logo"
                    icon={logoFacebook}
                    onClick={() =>
                      onVisitSocial("https://instagram.com/groomzy_")
                    }
                  ></IonIcon>
                </IonRow>
              </IonCol>
              <IonCol sizeXs="1" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};
