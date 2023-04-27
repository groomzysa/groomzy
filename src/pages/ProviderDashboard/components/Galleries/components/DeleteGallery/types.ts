import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface IDeleteGalleryProps {
  gridRef: RefObject<AgGridReact<any>>;
}
