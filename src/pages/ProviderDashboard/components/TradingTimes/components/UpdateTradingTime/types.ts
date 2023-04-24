import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface IUpdateTradingTimeProps {
  gridRef: RefObject<AgGridReact<any>>;
}
