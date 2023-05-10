import { AgGridReact } from "ag-grid-react";
import { RefObject, useEffect } from "react";
import { useHistory } from "react-router";
import { routes } from "../../../../../route/routes";
import { useGridSettings } from "./useGridSettings";
import { RefresherEventDetail } from "@ionic/react";
import { useFetchProvider } from "../../../../../api/hooks/queries";

export const useStaffs = (gridRef: RefObject<AgGridReact<any>>) => {
  /**
   *
   * Hooks
   *
   */

  const {
    staffsLoading,
    hasStaffs,
    columnDefs,
    defaultColDef,
    onSelectionChanged,
    onGridReady,
  } = useGridSettings(gridRef);

  const { fetchProvider, provider } = useFetchProvider();

  const history = useHistory();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    fetchProvider();
  }, [fetchProvider]);

  /**
   *
   * Handlers
   *
   */

  const onRefetchStaffs = (event: CustomEvent<RefresherEventDetail>) => {
    gridRef.current?.api.purgeInfiniteCache();
    event.detail.complete();
  };

  const onCreateStaff = () => {
    history.push(`/${routes.providerDashboard.staffs.createStaff.use()}`);
  };

  const onToAddDetails = () => {
    history.push(`/${routes.providerDashboard.details.use()}`);
  };

  return {
    staffsLoading,
    hasStaffs,
    hasProvider: !!provider,
    columnDefs,
    defaultColDef,
    onSelectionChanged,
    onCreateStaff,
    onGridReady,
    onRefetchStaffs,
    onToAddDetails,
  };
};
