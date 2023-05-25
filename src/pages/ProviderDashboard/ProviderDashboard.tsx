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
  peopleOutline,
} from "ionicons/icons";
import { FC } from "react";
import { Details, Services, TradingTimes, GalleryImages } from "./components";

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
  CreateGalleryImage,
  DeleteGalleryImage,
} from "./components/GalleryImages/components";
import { Staffs } from "./components/Staffs/Staffs";
import {
  CreateStaff,
  DeleteStaff,
  UpdateStaff,
  ViewStaff,
} from "./components/Staffs/components";

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

        {/* Staffs routes */}
        <Route
          exact
          path={`/${routes.providerDashboard.staffs.get()}`}
          render={() => <Staffs gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.staffs.createStaff.get()}`}
          render={() => <CreateStaff gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.staffs.updateStaff.get()}`}
          render={() => <UpdateStaff gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.staffs.deleteStaff.get()}`}
          render={() => <DeleteStaff gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.staffs.viewStaff.get()}`}
          component={ViewStaff}
        />

        {/* GalleryImages routes */}
        <Route
          exact
          path={`/${routes.providerDashboard.gallery.get()}`}
          render={() => <GalleryImages gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.gallery.createGallery.get()}`}
          render={() => <CreateGalleryImage gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.gallery.updateGallery.get()}`}
          render={() => <UpdateTradingTime gridRef={gridRef} />}
        />

        <Route
          exact
          path={`/${routes.providerDashboard.gallery.deleteGallery.get()}`}
          render={() => <DeleteGalleryImage gridRef={gridRef} />}
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

      <IonTabBar slot="bottom" keyboard-attach className="bar-assertive">
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
          tab="staffs"
          href={`/${routes.providerDashboard.staffs.use()}`}
        >
          <IonIcon icon={peopleOutline} />
          <IonLabel>Staff</IonLabel>
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
