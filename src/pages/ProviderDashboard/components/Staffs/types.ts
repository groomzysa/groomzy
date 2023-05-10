import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface IStaffsProps {
  gridRef: RefObject<AgGridReact<any>>;
}
