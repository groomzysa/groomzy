import { FC } from "react";
import { useServiceProviders } from "./hooks";
import {
  IonCol,
  IonGrid,
  IonLoading,
  IonNote,
  IonRefresher,
  IonRefresherContent,
  IonRow,
} from "@ionic/react";
import { isEmpty } from "lodash";
import { ServiceProvider } from "../ServiceProvider/ServiceProvider";

export const ServiceProviders: FC = () => {
  const { search, providers, providersLoading, refetchProvidersHandler } =
    useServiceProviders();
  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={refetchProvidersHandler}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <IonLoading isOpen={providersLoading} />

      {!providersLoading && providers.length === 0 && isEmpty(search) && (
        <div className="home-explorer-empty-state">
          <img src="assets/empty-box.svg" alt="Empty box" height={200} />
          <IonNote>
            There are currently no service providers. Please check later.
          </IonNote>
        </div>
      )}

      {!providersLoading && providers.length === 0 && !isEmpty(search) && (
        <>
          <div className="home-explorer-empty-search-state">
            <img src="assets/searching-data.svg" alt="Empty box" height={200} />
            <IonNote>
              There are no service providers matching your search.
            </IonNote>
          </div>
        </>
      )}

      {!providersLoading && providers.length > 0 && (
        <IonGrid>
          <IonRow>
            {providers?.map((provider) => {
              return (
                <IonCol
                  key={provider.id}
                  sizeXs="12"
                  sizeSm="6"
                  sizeMd="4"
                  sizeLg="3"
                >
                  <ServiceProvider provider={provider} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      )}
    </>
  );
};
