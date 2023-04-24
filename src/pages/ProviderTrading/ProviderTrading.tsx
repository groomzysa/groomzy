import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route, useParams } from "react-router-dom";
import { businessOutline, informationCircleOutline } from "ionicons/icons";
import { FC } from "react";
import { Details, Services } from "./components";

import "./styles.css";
import { routes } from "../../route/routes";

export const ProviderTrading: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          path={`/${routes.providerTrading.services.get()}`}
          component={Services}
        />

        <Route
          path={`/${routes.providerTrading.details.get()}`}
          component={Details}
        />

        <Route
          exact
          path={`/${routes.providerTrading.base.get()}`}
          render={() => {
            return (
              <Redirect to={`/${routes.providerTrading.services.use(id)}`} />
            );
          }}
        />

        <Route
          render={() => {
            return <Redirect exact to="/" />;
          }}
        />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton
          tab="services"
          href={`/${routes.providerTrading.services.use(id)}`}
        >
          <IonIcon icon={businessOutline} />
          <IonLabel>Services</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="details"
          href={`/${routes.providerTrading.details.use(id)}`}
        >
          <IonIcon icon={informationCircleOutline} />
          <IonLabel>Details</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
