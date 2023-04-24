import { AgGridReact } from "ag-grid-react";
import { useRef } from "react";
import { useNativeElementsSizeInfo } from "../../../hooks";

export const useProviderDashboard = () => {
  /**
   *
   * Hooks
   *
   */
  const { keyboardHeight, topToolBarHeight } = useNativeElementsSizeInfo();
  const gridRef = useRef<AgGridReact>(null);

  return {
    gridRef,
    keyboardHeight,
    topToolBarHeight,
  };
};
