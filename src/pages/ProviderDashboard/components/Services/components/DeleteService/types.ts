import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface IDeleteServiceProps {
  gridRef: RefObject<AgGridReact<any>>;
}
