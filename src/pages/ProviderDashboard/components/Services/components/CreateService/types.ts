import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface ICreateServiceProps {
  gridRef: RefObject<AgGridReact<any>>;
}
