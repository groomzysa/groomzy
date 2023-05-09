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
  const {
    tradingTimesLoading,
    columnDefs,
    defaultColDef,
    hasTradingTimes,
    onGridReady,
    onSelectionChanged,
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
  const onRefetchTradingTimes = (event: CustomEvent<RefresherEventDetail>) => {
    gridRef.current?.api.purgeInfiniteCache();
    event.detail.complete();
  };

  const onCreateTradingTime = () => {
    history.push(
      `/${routes.providerDashboard.tradingTimes.createTradingTime.use()}`
    );
  };

  const onToAddDetails = () => {
    history.push(`/${routes.providerDashboard.details.use()}`);
  };

  return {
    tradingTimesLoading,
    hasProvider: !!provider,
    hasTradingTimes,
    columnDefs,
    defaultColDef,
    onGridReady,
    onSelectionChanged,
    onCreateTradingTime,
    onRefetchTradingTimes,
    onToAddDetails,
  };
};
