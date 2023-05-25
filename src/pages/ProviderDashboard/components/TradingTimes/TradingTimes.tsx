import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonNote,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AgGridReact } from "ag-grid-react";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import { addOutline } from "ionicons/icons";
import { FC } from "react";
import { PAGE_SIZE } from "./constants";
import { useTradingTimes } from "./hooks";
import { ITradingTimesProps } from "./types";
import "ag-grid-community/styles/ag-grid.min.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.min.css"; // Optional theme CSS
import "./styles.css";

export const TradingTimes: FC<ITradingTimesProps> = ({ gridRef }) => {
  const {
    tradingTimesLoading,
    hasProvider,
    columnDefs,
    defaultColDef,
    hasTradingTimes,
    onGridReady,
    onSelectionChanged,
    onCreateTradingTime,
    onRefetchTradingTimes,
    onToAddDetails,
  } = useTradingTimes(gridRef);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Operating times</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={onRefetchTradingTimes}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {hasProvider && (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton onClick={onCreateTradingTime}>
                  <IonIcon slot="start" icon={addOutline}></IonIcon>
                  Create
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="trading-times-grid-container">
                {tradingTimesLoading ? (
                  <IonSpinner
                    color="primary"
                    className="trading-times-loading-state"
                  ></IonSpinner>
                ) : (
                  !hasTradingTimes && (
                    <div className="trading-times-empty-state">
                      <div>
                        <img
                          src="assets/empty-box.svg"
                          alt="Empty box"
                          height={200}
                        />
                      </div>
                      <div>
                        <IonNote>
                          There are currently no trading times added.
                        </IonNote>
                      </div>
                    </div>
                  )
                )}

                <div className="ag-theme-alpine">
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

        {!hasProvider && (
          <div className="trading-times-no-provider-container">
            <div>
              <IonGrid>
                <IonRow>
                  <IonCol sizeXs="0" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
                  <IonCol sizeXs="12" sizeSm="8" sizeMd="6" sizeLg="4">
                    <IonText>
                      Before adding trading times, please add provider details.
                    </IonText>
                    <IonText
                      className="trading-times-no-provider-link"
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
        )}
      </IonContent>
    </IonPage>
  );
};
