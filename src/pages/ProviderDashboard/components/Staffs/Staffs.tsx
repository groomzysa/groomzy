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
import { FC } from "react";
import { useStaffs } from "./hooks";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.min.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.min.css"; // Optional theme CSS
import "./styles.css";
import { addOutline } from "ionicons/icons";
import { PAGE_SIZE } from "./constants";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import { IStaffsProps } from "./types";

export const Staffs: FC<IStaffsProps> = ({ gridRef }) => {
  /**
   *
   * Hooks
   *
   */
  const {
    staffsLoading,
    hasStaffs,
    hasProvider,
    columnDefs,
    defaultColDef,
    onSelectionChanged,
    onCreateStaff,
    onGridReady,
    onRefetchStaffs,
    onToAddDetails,
  } = useStaffs(gridRef);

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
        <IonRefresher slot="fixed" onIonRefresh={onRefetchStaffs}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {hasProvider && (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton onClick={() => onCreateStaff()}>
                  <IonIcon slot="start" icon={addOutline}></IonIcon>
                  Create
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="staffs-grid-container">
                {staffsLoading ? (
                  <IonSpinner
                    color="primary"
                    className="staffs-loading-state"
                  ></IonSpinner>
                ) : (
                  !hasStaffs && (
                    <div className="staffs-empty-state">
                      <div>
                        <img
                          src="assets/empty-box.svg"
                          alt="Empty box"
                          height={200}
                        />
                      </div>
                      <div>
                        <IonNote>There are currently no staffs added.</IonNote>
                      </div>
                    </div>
                  )
                )}

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

        {!hasProvider && (
          <div className="staffs-no-provider-container">
            <div>
              <IonGrid>
                <IonRow>
                  <IonCol sizeXs="0" sizeSm="2" sizeMd="3" sizeLg="4"></IonCol>
                  <IonCol sizeXs="12" sizeSm="8" sizeMd="6" sizeLg="4">
                    <IonText>
                      Before adding staffs, please add provider details.
                    </IonText>
                    <IonText
                      className="service-no-provider-link"
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
