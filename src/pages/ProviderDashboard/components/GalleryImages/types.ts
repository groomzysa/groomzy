import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface IGalleryImagesProps {
  gridRef: RefObject<AgGridReact<any>>;
}
