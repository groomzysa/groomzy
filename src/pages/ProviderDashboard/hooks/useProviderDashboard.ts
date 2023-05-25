import { AgGridReact } from "ag-grid-react";
import { useRef } from "react";

export const useProviderDashboard = () => {
  /**
   *
   * Hooks
   *
   */
  const gridRef = useRef<AgGridReact>(null);

  return {
    gridRef,
  };
};
