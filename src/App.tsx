import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import {
  HomeExplorer,
  ProviderTrading,
  SignIn,
  SignUp,
  ProviderDashboard,
  Contacts,
  About,
  Account,
  RequestPasswordReset,
  PasswordReset,
} from "./pages";
import { Menu } from "./components";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/ag-grid-alpine.css";
import "./global.css";
import { useAppHandlers } from "./hooks";
import { UserRole } from "./api/graphql/api.schema";
import { routes } from "./route/routes";
import { isEmpty } from "lodash";

setupIonicReact();

const App: React.FC = () => {
  const { token, user, userLoading } = useAppHandlers();

  return (
    <IonApp>
      <IonReactRouter>
        {userLoading ? (
          <IonLoading isOpen={userLoading} spinner="bubbles"></IonLoading>
        ) : (
          <>
            <Menu user={user} />
            <IonRouterOutlet id="main">
              <Route
                exact
                path={"/"}
                render={() => {
                  if (
                    !isEmpty(token) &&
                    user &&
                    user.role === UserRole.Provider
                  ) {
                    return (
                      <Redirect
                        exact
                        to={`/${routes.providerDashboard.base.use()}`}
                      />
                    );
                  }

                  return <Redirect exact to={`/${routes.home.base.use()}`} />;
                }}
              />
              <Route
                exact
                path={`/${routes.account.base.get()}`}
                render={() => {
                  if (isEmpty(token) || isEmpty(user)) {
                    return <Redirect exact to={`/${routes.home.base.use()}`} />;
                  }

                  return <Account user={user} />;
                }}
              />
              <Route
                exact
                path={`/${routes.signIn.base.get()}`}
                render={() => {
                  if (!isEmpty(token) && user) {
                    if (user.role === UserRole.Provider) {
                      return (
                        <Redirect
                          exact
                          to={`/${routes.providerDashboard.base.use()}`}
                        />
                      );
                    } else {
                      return (
                        <Redirect exact to={`/${routes.home.base.use()}`} />
                      );
                    }
                  }

                  return <SignIn />;
                }}
              />
              <Route
                exact
                path={`/${routes.signUp.base.get()}`}
                render={() => {
                  if (!isEmpty(token) && user) {
                    if (user.role === UserRole.Provider) {
                      return (
                        <Redirect
                          exact
                          to={`/${routes.providerDashboard.base.use()}`}
                        />
                      );
                    } else {
                      return (
                        <Redirect exact to={`/${routes.home.base.use()}`} />
                      );
                    }
                  }

                  return <SignUp />;
                }}
              />
              <Route
                exact
                path={`/${routes.requestPasswordReset.base.get()}`}
                render={() => {
                  if (!isEmpty(token) && user) {
                    if (user.role === UserRole.Provider) {
                      return (
                        <Redirect
                          exact
                          to={`/${routes.providerDashboard.base.use()}`}
                        />
                      );
                    } else {
                      return (
                        <Redirect exact to={`/${routes.home.base.use()}`} />
                      );
                    }
                  }

                  return <RequestPasswordReset />;
                }}
              />

              <Route
                exact
                path={`/${routes.passwordReset.base.get()}`}
                render={() => {
                  if (!isEmpty(token) && user) {
                    if (user.role === UserRole.Provider) {
                      return (
                        <Redirect
                          exact
                          to={`/${routes.providerDashboard.base.use()}`}
                        />
                      );
                    } else {
                      return (
                        <Redirect exact to={`/${routes.home.base.use()}`} />
                      );
                    }
                  }

                  return <PasswordReset />;
                }}
              />

              <Route
                exact
                path={`/${routes.about.base.get()}`}
                component={About}
              />
              <Route
                exact
                path={`/${routes.contacts.base.get()}`}
                component={Contacts}
              />
              <Route
                path={`/${routes.providerDashboard.base.get()}`}
                render={() => {
                  if (isEmpty(token) || user?.role !== UserRole.Provider) {
                    return <Redirect exact to={`/${routes.home.base.use()}`} />;
                  }

                  return <ProviderDashboard />;
                }}
              />
              <Route
                path={`/${routes.home.base.get()}`}
                render={() => {
                  if (!isEmpty(token) && user?.role === UserRole.Provider) {
                    return (
                      <Redirect
                        exact
                        to={`/${routes.providerDashboard.base.use()}`}
                      />
                    );
                  }

                  return <HomeExplorer />;
                }}
              />
              <Route
                path={`/${routes.providerTrading.base.get()}`}
                render={() => {
                  if (user?.role === UserRole.Provider) {
                    return (
                      <Redirect
                        exact
                        to={`/${routes.providerDashboard.base.use()}`}
                      />
                    );
                  }

                  return <ProviderTrading />;
                }}
              />
              <Route
                render={() => {
                  return <Redirect exact to="/" />;
                }}
              />
            </IonRouterOutlet>
          </>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
