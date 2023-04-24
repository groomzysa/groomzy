import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { useServices } from "./hooks";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.min.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.min.css"; // Optional theme CSS
import "./styles.css";
import { addOutline } from "ionicons/icons";
import { PAGE_SIZE } from "./constants";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import { IServicesProps } from "./types";

export const Services: FC<IServicesProps> = ({ gridRef }) => {
  /**
   *
   * Hooks
   *
   */
  const {
    noProvider,
    columnDefs,
    defaultColDef,
    onSelectionChanged,
    onCreateService,
    onGridReady,
    onRefetchSerices,
  } = useServices(gridRef);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Services</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={onRefetchSerices}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {noProvider ? (
          <div className="services-no-provider-container">
            <div>
              <IonGrid>
                <IonRow>
                  <IonCol sizeXs="0" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
                  <IonCol sizeXs="12" sizeSm="8" sizeMd="6" sizeLg="4">
                    <IonText>
                      Before adding services, please add provider details.
                    </IonText>
                    <IonText class="service-no-provider-link">
                      <strong>Click here to add details</strong>
                    </IonText>
                  </IonCol>
                  <IonCol sizeXs="0" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton onClick={() => onCreateService()}>
                  <IonIcon slot="start" icon={addOutline}></IonIcon>
                  Create
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol class="services-grid-container">
                <div className={"ag-theme-alpine"}>
                  <AgGridReact
                    ref={gridRef}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onSelectionChanged={onSelectionChanged}
                    onGridReady={onGridReady}
                    paginationPageSize={PAGE_SIZE}
                    cacheBlockSize={PAGE_SIZE}
                    modules={[InfiniteRowModelModule]}
                    getRowId={({ data }) => data.id}
                    rowSelection="single"
                    rowModelType="infinite"
                    animateRows
                    pagination
                  />
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};
