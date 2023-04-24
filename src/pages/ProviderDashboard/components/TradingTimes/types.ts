import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface ITradingTimesProps {
  gridRef: RefObject<AgGridReact<any>>;
}
