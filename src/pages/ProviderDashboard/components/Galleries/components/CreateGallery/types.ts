import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface ICreateGalleryProps {
  gridRef: RefObject<AgGridReact<any>>;
}
