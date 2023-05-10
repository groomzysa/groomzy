import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface IUpdateStaffProps {
  gridRef: RefObject<AgGridReact<any>>;
}
