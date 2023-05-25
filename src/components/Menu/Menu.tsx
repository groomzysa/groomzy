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

import { logOutOutline } from "ionicons/icons";

import {
  ABOUT,
  ACCOUNT,
  CONTACTS,
  HOME,
  DASHBOARD,
  SIGN_IN,
  SIGN_UP,
} from "../../utils/pages";

import "./styles.css";
import { useMenuHook } from "./hooks";
import { User, UserRole } from "../../api/graphql/api.schema";
import { APP_PAGES } from "./constants";

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
          <IonListHeader className="menu-header">
            <IonAvatar className="menu-avatar">
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

          {APP_PAGES.filter((page) => {
            if (user?.role === UserRole.Provider) {
              return [DASHBOARD, ACCOUNT, ABOUT, CONTACTS].includes(page.title);
            } else if (user?.role === UserRole.Client) {
              return [HOME, ACCOUNT, ABOUT, CONTACTS].includes(page.title);
            }

            return [HOME, ABOUT, CONTACTS].includes(page.title);
          }).map((appPage, index) => {
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
            APP_PAGES.filter((page) => {
              return [SIGN_IN, SIGN_UP].includes(page.title);
            }).map((appPage, index) => {
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
                className="signout"
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
          className="copyright-and-version-container"
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
