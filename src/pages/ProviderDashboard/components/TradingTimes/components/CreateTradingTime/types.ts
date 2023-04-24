import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface ICreateTradingTimeProps {
  gridRef: RefObject<AgGridReact<any>>;
}
