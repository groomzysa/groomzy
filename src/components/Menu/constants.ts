import {
  homeOutline,
  personCircleOutline,
  informationCircleOutline,
  callOutline,
  logInOutline,
  personAddOutline,
} from "ionicons/icons";
import { routes } from "../../route/routes";
import {
  HOME,
  DASHBOARD,
  ACCOUNT,
  ABOUT,
  CONTACTS,
  SIGN_IN,
  SIGN_UP,
} from "../../utils/pages";
import { AppPage } from "./types";

export const APP_PAGES: AppPage[] = [
  {
    title: HOME,
    url: `/${routes.home.base.get()}`,
    icon: homeOutline,
  },
  {
    title: DASHBOARD,
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
