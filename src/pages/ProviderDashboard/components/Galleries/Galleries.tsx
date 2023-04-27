import { FC } from "react";
import { IGalleriesProps } from "./types";
import { useGalleries } from "./hooks/useGalleries";
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
import { addOutline } from "ionicons/icons";
import { AgGridReact } from "ag-grid-react";
import { PAGE_SIZE } from "./constants";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import "ag-grid-community/styles/ag-grid.min.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.min.css"; // Optional theme CSS
import "./styles.css";

export const Galleries: FC<IGalleriesProps> = ({ gridRef }) => {
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
    onCreateGallery,
    onGridReady,
    onRefetchSerices,
    onToAddDetails,
  } = useGalleries(gridRef);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={onRefetchSerices}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {noProvider ? (
          <div className="galleries-no-provider-container">
            <div>
              <IonGrid>
                <IonRow>
                  <IonCol sizeXs="0" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
                  <IonCol sizeXs="12" sizeSm="8" sizeMd="6" sizeLg="4">
                    <IonText>
                      Before adding gallery image, please add provider details.
                    </IonText>
                    <IonText
                      class="galleries-no-provider-link"
                      onClick={onToAddDetails}
                    >
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
                <IonButton onClick={() => onCreateGallery()}>
                  <IonIcon slot="start" icon={addOutline}></IonIcon>
                  Create
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol class="galleries-grid-container">
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
