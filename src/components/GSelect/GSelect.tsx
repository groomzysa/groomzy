import { IonItem, IonNote, IonSelect, IonSelectOption } from "@ionic/react";
import { FC } from "react";
import { IGSelectProps } from "./types";
import "./styles.css";

export const GSelect: FC<IGSelectProps> = ({
  value,
  onSelectChange,
  options,
  error,
  label = "Select",
  placeholder = "",
  labelPosition = "floating",
}) => {
  return (
    <IonItem className="g-select-container">
      <IonSelect
        label={label}
        labelPlacement={labelPosition}
        placeholder={placeholder}
        interface="popover"
        className="g-select"
        value={value}
        onIonChange={(e) => onSelectChange(e)}
      >
        {options.map((option) => {
          return (
            <IonSelectOption key={option.value as any} value={option.value}>
              {option.label}
            </IonSelectOption>
          );
        })}
      </IonSelect>
      {error && (
        <IonNote slot="error" className="error">
          {error}
        </IonNote>
      )}
    </IonItem>
  );
};
