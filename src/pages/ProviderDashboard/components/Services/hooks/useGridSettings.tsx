import { RefObject, useCallback, useMemo } from "react";
import {
  ColDef,
  Column,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
} from "ag-grid-community";
import { isPlatform } from "@ionic/react";

import { PaginationType } from "../../../../../api/graphql/api.schema";
import { ServiceActions } from "../components";
import { PAGE_SIZE, SERVICE_COLUMNS } from "../constants";
import { useFetchServices } from "../../../../../api/hooks/queries";
import { AgGridReact } from "ag-grid-react";

export const useGridSettings = (gridRef: RefObject<AgGridReact<any>>) => {
  const isMobile = isPlatform("mobile");

  /**
   *
   * Grid config
   *
   */

  const columnDefs: ColDef<Column | string>[] = useMemo(
    () => [
      isMobile
        ? {
            field: SERVICE_COLUMNS.NAME,
            headerName: "Name",
            checkboxSelection: true,
            pinned: "left",
            width: 160,
            flex: 1,
            cellRenderer: (props: ICellRendererParams) => (
              <ServiceActions props={props} />
            ),
          }
        : {
            field: SERVICE_COLUMNS.NAME,
            headerName: "Name",
            checkboxSelection: true,
            pinned: "left",
            minWidth: 300,
            flex: 2,
            cellRenderer: (props: ICellRendererParams) => (
              <ServiceActions props={props} />
            ),
          },
      { field: SERVICE_COLUMNS.CATEGORY, headerName: "Category", minWidth: 80 },
      { field: SERVICE_COLUMNS.PRICE_TEXT, headerName: "Price", minWidth: 80 },
      {
        field: SERVICE_COLUMNS.DURATION_TEXT,
        headerName: "Duration",
        minWidth: 80,
        hide: isMobile,
      },
      {
        field: SERVICE_COLUMNS.DESCRIPTION,
        headerName: "Description",
        minWidth: 80,
        hide: isMobile,
        flex: 2,
      },
    ],
    [isMobile]
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
   * Hooks
   *
   */
  const { fetchServices } = useFetchServices();

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
          const { data } = await fetchServices({
            limit: PAGE_SIZE,
            paginationType: PaginationType.Normal,
            page: gridParams.api.paginationGetCurrentPage(),
          });
          let count = data?.services?.count || 0;

          try {
            const rows = (data?.services?.services || []).map((service) => {
              const priceText = `R ${service.price!.toFixed(2)}`;
              const duration = `${service.duration!.toFixed(2)}`;
              const durationUnit = service.durationUnit!.toLowerCase();
              return {
                ...service,
                priceText,
                durationText: duration + durationUnit,
              };
            });

            if (rows.length === 0 && count > 0) {
              count = 0;
            }

            if (count === 0 && rows.length > 0) {
              count = rows.length;
            }

            params.successCallback(rows, count);
          } catch (error) {
            console.error(error);
          }
        },
      };

      gridParams.api.setDatasource(dataSource);
    },
    [fetchServices]
  );

  return {
    columnDefs,
    defaultColDef,
    onSelectionChanged,
    onGridReady,
  };
};
