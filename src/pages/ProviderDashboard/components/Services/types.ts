import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface IServicesProps {
  gridRef: RefObject<AgGridReact<any>>;
}
