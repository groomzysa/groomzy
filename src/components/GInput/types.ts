import { TextFieldTypes } from "@ionic/core";

export interface IGInputProps {
  label: string;
  labelPosition?: "fixed" | "stacked" | "floating";
  value: string;
  onValueChange: (e: Event) => void;
  type: TextFieldTypes;
  iconName?: string;
  iconSlot?: "start" | "end";
  iconClass?: string;
  iconAction?: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  textArea?: boolean;
  textAreaRows?: number;
}
