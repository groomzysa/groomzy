import { AgGridReact } from "ag-grid-react";
import { RefObject, useEffect } from "react";
import { useHistory } from "react-router";
import { routes } from "../../../../../route/routes";
import { useGridSettings } from "./useGridSettings";
import { RefresherEventDetail } from "@ionic/react";
import { useFetchProvider } from "../../../../../api/hooks/queries";

export const useServices = (gridRef: RefObject<AgGridReact<any>>) => {
  /**
   *
   * Hooks
   *
   */

  const { columnDefs, defaultColDef, onSelectionChanged, onGridReady } =
    useGridSettings(gridRef);

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

  const onRefetchSerices = (event: CustomEvent<RefresherEventDetail>) => {
    gridRef.current?.api.purgeInfiniteCache();
    event.detail.complete();
  };

  const onCreateService = () => {
    history.push(`/${routes.providerDashboard.services.createService.use()}`);
  };

  const onToAddDetails = () => {
    history.push(`/${routes.providerDashboard.details.use()}`);
  };

  return {
    noProvider: !provider,
    columnDefs,
    defaultColDef,
    onSelectionChanged,
    onCreateService,
    onGridReady,
    onRefetchSerices,
    onToAddDetails,
  };
};
