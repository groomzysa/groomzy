import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface IGalleriesProps {
  gridRef: RefObject<AgGridReact<any>>;
}
