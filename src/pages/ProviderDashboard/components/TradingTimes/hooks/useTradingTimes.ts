import { AgGridReact } from "ag-grid-react";
import { RefObject, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../../route/routes";
import { useGridSettings } from "./useGridSettings";
import { RefresherEventDetail } from "@ionic/react";
import { useFetchProvider } from "../../../../../api/hooks/queries";

export const useTradingTimes = (gridRef: RefObject<AgGridReact<any>>) => {
  /**
   *
   * Hooks
   *
   */
  const { columnDefs, defaultColDef, onGridReady, onSelectionChanged } =
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
  const onRefetchTradingTimes = (event: CustomEvent<RefresherEventDetail>) => {
    gridRef.current?.api.purgeInfiniteCache();
    event.detail.complete();
  };

  const onCreateTradingTime = () => {
    history.push(
      `/${routes.providerDashboard.tradingTimes.createTradingTime.use()}`
    );
  };

  return {
    noProvider: !provider,
    columnDefs,
    defaultColDef,
    onGridReady,
    onSelectionChanged,
    onCreateTradingTime,
    onRefetchTradingTimes,
  };
};
