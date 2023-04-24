import { SelectChangeEventDetail } from "@ionic/react";
import { ISelectOption } from "../../utils/types";

export interface IGSelectProps {
  value: unknown;
  options: ISelectOption<unknown>[];
  onSelectChange: (e: CustomEvent<SelectChangeEventDetail<any>>) => void;
  label?: string;
  labelPosition?: "fixed" | "stacked" | "floating";
  placeholder?: string;
  error?: string;
}
