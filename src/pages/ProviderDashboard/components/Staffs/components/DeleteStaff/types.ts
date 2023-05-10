import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface IDeleteStaffProps {
  gridRef: RefObject<AgGridReact<any>>;
}
