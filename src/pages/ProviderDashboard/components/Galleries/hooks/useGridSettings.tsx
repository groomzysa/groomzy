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
import { GalleryActions } from "../components";
import { PAGE_SIZE, Gallery_COLUMNS } from "../constants";
import { useFetchGalleries } from "../../../../../api/hooks/queries";
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
            field: Gallery_COLUMNS.NAME,
            headerName: "Name",
            checkboxSelection: true,
            pinned: "left",
            width: 160,
            flex: 1,
            cellRenderer: (props: ICellRendererParams) => (
              <GalleryActions props={props} />
            ),
          }
        : {
            field: Gallery_COLUMNS.NAME,
            headerName: "Name",
            checkboxSelection: true,
            pinned: "left",
            minWidth: 300,
            flex: 2,
            cellRenderer: (props: ICellRendererParams) => (
              <GalleryActions props={props} />
            ),
          },
      {
        field: Gallery_COLUMNS.GALLERY_IMAGE_URL,
        headerName: "Image url",
        minWidth: 80,
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
  const { fetchGalleries } = useFetchGalleries();

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
          const { data } = await fetchGalleries({
            limit: PAGE_SIZE,
            paginationType: PaginationType.Normal,
            page: gridParams.api.paginationGetCurrentPage(),
          });
          let count = data?.galleries?.count || 0;

          try {
            const rows = (data?.galleries?.galleries || []).map((gallery) => {
              return {
                ...gallery,
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
    [fetchGalleries]
  );

  return {
    columnDefs,
    defaultColDef,
    onSelectionChanged,
    onGridReady,
  };
};
