import { RefObject, useCallback, useMemo, useState } from "react";
import {
  ColDef,
  Column,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
} from "ag-grid-community";
import { isPlatform } from "@ionic/react";

import { PaginationType } from "../../../../../api/graphql/api.schema";
import { StaffActions } from "../components";
import { PAGE_SIZE, STAFF_COLUMNS } from "../constants";
import { useFetchStaffs } from "../../../../../api/hooks/queries";
import { AgGridReact } from "ag-grid-react";

export const useGridSettings = (gridRef: RefObject<AgGridReact<any>>) => {
  const [hasStaffs, setHasStaffs] = useState(false);
  const [staffsLoading, setStaffsLoading] = useState(true);
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
            field: STAFF_COLUMNS.FIRST_NAME,
            headerName: "First name",
            checkboxSelection: true,
            pinned: "left",
            width: 160,
            flex: 1,
            cellRenderer: (props: ICellRendererParams) => (
              <StaffActions props={props} />
            ),
          }
        : {
            field: STAFF_COLUMNS.FIRST_NAME,
            headerName: "First name",
            checkboxSelection: true,
            pinned: "left",
            minWidth: 300,
            flex: 2,
            cellRenderer: (props: ICellRendererParams) => (
              <StaffActions props={props} />
            ),
          },
      { field: STAFF_COLUMNS.LAST_NAME, headerName: "Last name", minWidth: 80 },
    ],
    [isMobile]
  );

  /**
   *
   * Hooks
   *
   */
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      flex: 1,
    }),
    []
  );

  const { fetchStaffs } = useFetchStaffs();

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
          setStaffsLoading(true);

          const { data } = await fetchStaffs({
            limit: PAGE_SIZE,
            paginationType: PaginationType.Normal,
            page: gridParams.api.paginationGetCurrentPage(),
          });
          let count = data?.staffs?.count || 0;

          try {
            const rows = (data?.staffs?.staffs || []).map((staff) => {
              return {
                ...staff,
              };
            });

            if (rows.length === 0 && count > 0) {
              count = 0;
            }

            if (count === 0 && rows.length > 0) {
              count = rows.length;
            }

            setHasStaffs(count > 0);
            setStaffsLoading(false);

            params.successCallback(rows, count);
          } catch (error) {
            setStaffsLoading(false);

            console.error(error);
          }
        },
      };

      gridParams.api.setDatasource(dataSource);
    },
    [fetchStaffs]
  );

  return {
    staffsLoading,
    hasStaffs,
    columnDefs,
    defaultColDef,
    onSelectionChanged,
    onGridReady,
  };
};
