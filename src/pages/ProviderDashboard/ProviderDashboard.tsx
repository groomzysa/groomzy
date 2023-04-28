import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import {
  businessOutline,
  imageOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { FC } from "react";
import { Details, Services, TradingTimes, Gallery } from "./components";

import "./styles.css";
import {
  CreateService,
  DeleteService,
  UpdateService,
  ViewService,
} from "./components/Services/components";
import { routes } from "../../route/routes";
import { useProviderDashboard } from "./hooks";
import {
  CreateTradingTime,
  UpdateTradingTime,
  DeleteTradingTime,
  ViewTradingTime,
} from "./components/TradingTimes/components";
import { VALID_URL_PATH_NAMES } from "../../utils/constants";
import {
  CreateGallery,
  DeleteGallery,
} from "./components/Galleries/components";

export const ProviderDashboard: FC = () => {
  /**
   *
   * Hooks
   *
   */
  const { gridRef } = useProviderDashboard();

  return (
    <IonTabs>
      <IonRouterOutlet animated={false}>
        {/* Services routes */}
        <Route
          exact
          path={`/${routes.providerDashboard.services.get()}`}
          render={() => <Services gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.services.createService.get()}`}
          render={() => <CreateService gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.services.updateService.get()}`}
          render={() => <UpdateService gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.services.deleteService.get()}`}
          render={() => <DeleteService gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.services.viewService.get()}`}
          component={ViewService}
        />

        {/* Details routes */}
        <Route
          exact
          path={`/${routes.providerDashboard.details.get()}`}
          component={Details}
        />

        {/* Trading times routes */}
        <Route
          exact
          path={`/${routes.providerDashboard.tradingTimes.get()}`}
          render={() => <TradingTimes gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.tradingTimes.createTradingTime.get()}`}
          render={() => <CreateTradingTime gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.tradingTimes.updateTradingTime.get()}`}
          render={() => <UpdateTradingTime gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.tradingTimes.deleteTradingTime.get()}`}
          render={() => <DeleteTradingTime gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.tradingTimes.viewTradingTime.get()}`}
          component={ViewTradingTime}
        />

        {/* Gallery routes */}
        <Route
          exact
          path={`/${routes.providerDashboard.gallery.get()}`}
          render={() => <Gallery gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.gallery.createGallery.get()}`}
          render={() => <CreateGallery gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.gallery.updateGallery.get()}`}
          render={() => <UpdateTradingTime gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.gallery.deleteGallery.get()}`}
          render={() => <DeleteGallery gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.gallery.viewGallery.get()}`}
          component={ViewTradingTime}
        />

        {/* Controlling defaulting routes */}
        <Route
          exact
          path={`/${routes.providerDashboard.base.get()}`}
          render={() => {
            return (
              <Redirect to={`/${routes.providerDashboard.services.get()}`} />
            );
          }}
        />

        <Route
          exact
          render={() => {
            const pathNameTo = window.location.pathname;
            if (VALID_URL_PATH_NAMES.includes(pathNameTo)) {
              if (`/${routes.providerDashboard.base.get()}` === pathNameTo) {
                return (
                  <Redirect
                    to={`/${routes.providerDashboard.services.get()}`}
                  />
                );
              }
              return <Redirect exact to={pathNameTo} />;
            }

            return <Redirect exact to="/" />;
          }}
        />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" keyboard-attach class="bar-assertive">
        <IonTabButton
          tab="services"
          href={`/${routes.providerDashboard.services.use()}`}
        >
          <IonIcon icon={businessOutline} />
          <IonLabel>Services</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="details"
          href={`/${routes.providerDashboard.details.use()}`}
        >
          <IonIcon icon={informationCircleOutline} />
          <IonLabel>Details</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="times"
          href={`/${routes.providerDashboard.tradingTimes.use()}`}
        >
          <IonIcon icon={informationCircleOutline} />
          <IonLabel>Times</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="gallery"
          href={`/${routes.providerDashboard.gallery.use()}`}
        >
          <IonIcon icon={imageOutline} />
          <IonLabel>Gallery</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
