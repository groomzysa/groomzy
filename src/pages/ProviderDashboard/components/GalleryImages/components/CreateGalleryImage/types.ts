import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";

export interface ICreateGalleryImageProps {
  gridRef: RefObject<AgGridReact<any>>;
}
