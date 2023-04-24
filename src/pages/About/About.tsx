import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenuButton,
  IonNote,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import { FC } from "react";
import { ABOUT } from "../../utils/pages";
import "./styles.css";

export const About: FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{ABOUT}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid class="about-main-content">
          <IonRow>
            <IonCol sizeXs="0" sizeSm="2" sizeLg="3"></IonCol>
            <IonCol sizeXs="12" sizeSm="8" sizeLg="6">
              <IonCard>
                <IonCardHeader class="about-header">Background</IonCardHeader>
                <IonCardContent>
                  <IonText>
                    Groomzy is a concept that was born in times of the 2020
                    COVID 19 Global pandemic in response to offer convenient,
                    transparent, flexible and reliable business operations
                    platform for the beauty grooming industry.
                  </IonText>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader class="about-header">
                  Birth of Groomzy
                </IonCardHeader>
                <IonCardContent>
                  <div>
                    <IonText>
                      Groomzy is a beauty grooming industry booking platform
                      where service providers offer their services and the
                      clients make bookings for these services.
                    </IonText>
                  </div>
                  <div>
                    <IonText>
                      Both users (clients and service providers) can download
                      the app to find service providers in prefered locations.
                    </IonText>
                  </div>
                  <div>
                    <IonText>
                      It is an Any time, Anywhere platform that has an in-house
                      booking feature, and makes scheduling and managing
                      bookings easier.
                    </IonText>
                  </div>
                  <IonList lines="none">
                    <IonItem>
                      <IonIcon
                        slot="start"
                        icon={arrowForwardOutline}
                      ></IonIcon>
                      <IonNote>
                        No more waiting for 9am to call and book your
                        appointment.
                      </IonNote>
                    </IonItem>
                    <IonItem>
                      <IonIcon
                        slot="start"
                        icon={arrowForwardOutline}
                      ></IonIcon>
                      <IonNote>
                        No more bais pricing and high prices with no competitor
                        options.
                      </IonNote>
                    </IonItem>
                    <IonItem>
                      <IonIcon
                        slot="start"
                        icon={arrowForwardOutline}
                      ></IonIcon>
                      <IonNote>
                        To get the most out of groomzy, search for a service
                        provider, view service provider services and details.
                        Choose a service of interest and make a booking.
                      </IonNote>
                    </IonItem>
                    <IonItem>
                      <IonIcon
                        slot="start"
                        icon={arrowForwardOutline}
                      ></IonIcon>
                      <IonNote>
                        Booking for a service is made easy, convenient and
                        instant. All this at a palm of your hand.
                      </IonNote>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader class="about-header">
                  Values and Missions
                </IonCardHeader>
                <IonCardContent>
                  <IonList lines="none">
                    <IonItem>
                      <IonIcon
                        slot="start"
                        icon={arrowForwardOutline}
                      ></IonIcon>
                      <IonNote>
                        Groomzy is commited to offer easy, convenient and
                        instant booking platform for all your grooming services
                        available.
                      </IonNote>
                    </IonItem>
                    <IonItem>
                      <IonIcon
                        slot="start"
                        icon={arrowForwardOutline}
                      ></IonIcon>
                      <IonNote>
                        Groomzy is commited to always put Groomzy clients’s
                        interests first making sure service providers are
                        servicing at thier best interest.
                      </IonNote>
                    </IonItem>
                    <IonItem>
                      <IonIcon
                        slot="start"
                        icon={arrowForwardOutline}
                      ></IonIcon>
                      <IonNote>
                        Groomzy is commited to provide a flexible and reliable
                        service to its users (clients and service providers).
                      </IonNote>
                    </IonItem>
                    <IonItem>
                      <IonIcon
                        slot="start"
                        icon={arrowForwardOutline}
                      ></IonIcon>
                      <IonNote>
                        Groomzy is commited to build trust and confidence
                        between Groomzy and its users by offering excellent and
                        reliable service.
                      </IonNote>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeXs="0" sizeSm="2" sizeLg="3"></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
