import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import { FC } from "react";

import {
  callOutline,
  homeOutline,
  informationCircleOutline,
  logInOutline,
  logOutOutline,
  personAddOutline,
  personCircleOutline,
} from "ionicons/icons";

import {
  ABOUT,
  ACCOUNT,
  CONTACTS,
  HOME,
  PROVIDER_DASHBOARD,
  SIGN_IN,
  SIGN_UP,
} from "../../utils/pages";

import "./styles.css";
import { useMenuHook } from "./hooks";
import { routes } from "../../route/routes";
import { User, UserRole } from "../../api/graphql/api.schema";

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: HOME,
    url: `/${routes.home.base.get()}`,
    icon: homeOutline,
  },
  {
    title: PROVIDER_DASHBOARD,
    url: `/${routes.providerDashboard.base.get()}`,
    icon: homeOutline,
  },
  {
    title: ACCOUNT,
    url: `/${routes.account.base.get()}`,
    icon: personCircleOutline,
  },
  {
    title: ABOUT,
    url: `/${routes.about.base.get()}`,
    icon: informationCircleOutline,
  },
  {
    title: CONTACTS,
    url: `/${routes.contacts.base.get()}`,
    icon: callOutline,
  },
  {
    title: SIGN_IN,
    url: `/${routes.signIn.base.get()}`,
    icon: logInOutline,
  },
  {
    title: SIGN_UP,
    url: `/${routes.signUp.base.get()}`,
    icon: personAddOutline,
  },
];

export const Menu: FC<{ user?: User | null }> = ({ user }) => {
  /**
   *
   * Hooks
   *
   */
  const { signOutHandler, selectedPage, onSetCurrentPageUrl } = useMenuHook();

  return (
    <IonMenu contentId="main">
      <IonContent>
        <IonList id="menu-list">
          <IonListHeader class="menu-header">
            <IonAvatar class="menu-avatar">
              <img
                alt={user?.firstName || "Avatar"}
                src={
                  user?.userImageUrl ||
                  "https://ionicframework.com/docs/img/demos/avatar.svg"
                }
              />
            </IonAvatar>
            {user ? (
              <IonNote className="menu-header-name">{`${user.firstName} ${user.lastName}`}</IonNote>
            ) : (
              <IonNote className="menu-header-name">Not signed in</IonNote>
            )}
          </IonListHeader>

          {appPages
            .filter((page) => {
              if (user?.role === UserRole.Provider) {
                return [PROVIDER_DASHBOARD, ACCOUNT, ABOUT, CONTACTS].includes(
                  page.title
                );
              } else if (user?.role === UserRole.Client) {
                return [HOME, ACCOUNT, ABOUT, CONTACTS].includes(page.title);
              }

              return [HOME, ABOUT, CONTACTS].includes(page.title);
            })
            .map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={selectedPage(appPage.url) ? "selected" : ""}
                    onClick={() => onSetCurrentPageUrl(appPage.url)}
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon slot="start" icon={appPage.icon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
        </IonList>
        <IonList>
          {!user &&
            appPages
              .filter((page) => {
                return [SIGN_IN, SIGN_UP].includes(page.title);
              })
              .map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem
                      className={selectedPage(appPage.url) ? "selected" : ""}
                      onClick={() => onSetCurrentPageUrl(appPage.url)}
                      routerLink={appPage.url}
                      routerDirection="none"
                      lines="none"
                      detail={false}
                    >
                      <IonIcon slot="start" icon={appPage.icon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
          {user && (
            <IonMenuToggle>
              <IonItem
                routerDirection="none"
                lines="none"
                detail={false}
                class="signout"
                onClick={() => signOutHandler()}
              >
                <IonIcon slot="start" icon={logOutOutline} />
                <IonLabel>Sign out</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}
        </IonList>
        <IonItem
          routerDirection="none"
          lines="none"
          detail={false}
          class="copyright-and-version-container"
        >
          <div className="copyright-and-version">
            <IonLabel slot="start">v1.0.0</IonLabel>
            <IonLabel slot="start">&copy; 2023 Groomzy, Pty (Ltd)</IonLabel>
          </div>
        </IonItem>
      </IonContent>
    </IonMenu>
  );
};
