import { RefObject, useCallback, useMemo, useState } from "react";
import {
  ColDef,
  Column,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { TradingTimesActions } from "../components";
import { PAGE_SIZE, TRADING_TIME_COLUMNS } from "../constants";
import { useFetchOperatingTimes } from "../../../../../api/hooks/queries";
import { PaginationType } from "../../../../../api/graphql/api.schema";

export const useGridSettings = (gridRef: RefObject<AgGridReact<any>>) => {
  const [hasTradingTimes, setHasTradingTimes] = useState(false);
  const [tradingTimesLoading, setTradingTimesLoading] = useState(true);

  /**
   *
   * Hooks
   *
   */
  const { fetchOperatingTimes } = useFetchOperatingTimes();

  const columnDefs: ColDef<Column | string>[] = useMemo(
    () => [
      {
        field: TRADING_TIME_COLUMNS.DAY,
        headerName: "Day",
        checkboxSelection: true,
        minWidth: 150,
        cellRenderer: (props: ICellRendererParams) => (
          <TradingTimesActions props={props} />
        ),
      },
      {
        field: TRADING_TIME_COLUMNS.OPEN_TIME,
        headerName: "Opens",
        minWidth: 80,
      },
      {
        field: TRADING_TIME_COLUMNS.CLOSE_TIME,
        headerName: "Closes",
        minWidth: 80,
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      flex: 1,
    }),
    []
  );

  /**
   *
   * Handlers
   *
   */
  const onSelectionChanged = useCallback(() => {
    if (!gridRef.current) {
      return;
    }

    gridRef.current?.api.refreshCells({
      force: true,
    });
  }, [gridRef]);

  const onGridReady = useCallback(
    async (gridParams: GridReadyEvent) => {
      const dataSource: IDatasource = {
        getRows: async (params) => {
          setTradingTimesLoading(true);

          const { data } = await fetchOperatingTimes({
            limit: PAGE_SIZE,
            paginationType: PaginationType.Normal,
            page: gridParams.api?.paginationGetCurrentPage(),
          });

          let count = data?.operatingTimes?.count || 0;

          try {
            const rows = (data?.operatingTimes?.operatingTimes || []).map(
              (operatingTime) => {
                return {
                  ...operatingTime,
                };
              }
            );

            if (rows.length === 0 && count > 0) {
              count = 0;
            }

            if (count === 0 && rows.length > 0) {
              count = rows.length;
            }

            setHasTradingTimes(count > 0);
            setTradingTimesLoading(false);

            params.successCallback(rows, count);
          } catch (error) {
            setTradingTimesLoading(false);
            console.error(error);
          }
        },
      };

      gridParams.api.setDatasource(dataSource);
    },
    [fetchOperatingTimes]
  );

  return {
    tradingTimesLoading,
    columnDefs,
    defaultColDef,
    hasTradingTimes,
    onSelectionChanged,
    onGridReady,
  };
};
