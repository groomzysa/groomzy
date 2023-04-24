import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface IUpdateServiceProps {
  gridRef: RefObject<AgGridReact<any>>;
}
