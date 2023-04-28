import { IonCol, IonGrid, IonRow, IonSearchbar } from "@ionic/react";
import { FC } from "react";
import { useServiceProvidersSearch } from "./hooks";

export const ServiceProvidersSearch: FC = () => {
  const { searchTmp, onSearchChange, onSearchClear } =
    useServiceProvidersSearch();
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonSearchbar
            value={searchTmp}
            onIonInput={onSearchChange}
            debounce={800}
            onIonClear={onSearchClear}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
