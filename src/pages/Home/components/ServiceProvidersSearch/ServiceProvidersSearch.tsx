import { IonCol, IonGrid, IonRow, IonSearchbar } from "@ionic/react";
import { FC } from "react";
import { useServiceProvidersSearch } from "./hooks";

export const ServiceProvidersSearch: FC = () => {
  const { search, onSearchChange, onSearchClear } = useServiceProvidersSearch();
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonSearchbar
            value={search}
            onIonInput={onSearchChange}
            debounce={800}
            onIonClear={onSearchClear}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
