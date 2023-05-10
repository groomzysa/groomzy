import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface ICreateStaffProps {
  gridRef: RefObject<AgGridReact<any>>;
}
