import { IonIcon, IonInput, IonTextarea } from "@ionic/react";
import { isEmpty } from "lodash";
import { FC, useState } from "react";
import { IGInputProps } from "./types";

import "./styles.css";

export const GInput: FC<IGInputProps> = ({
  label,
  error,
  value,
  type,
  iconName,
  iconSlot,
  iconClass,
  required,
  placeholder,
  labelPosition = "floating",
  textArea = false,
  textAreaRows,
  iconAction,
  onValueChange,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  let isValid = undefined;

  if (isTouched && isDirty) {
    if (!isEmpty(error)) {
      isValid = false;
    } else if (required && isEmpty(value)) {
      isValid = false;
    } else {
      isValid = true;
    }
  }

  return (
    <div>
      {textArea ? (
        <IonTextarea
          fill="outline"
          label={label}
          labelPlacement={labelPosition}
          className={`${isValid && "ion-valid"} ${
            isValid === false && "ion-invalid"
          } ${isTouched && "ion-touched"}`}
          required={required}
          value={value}
          onIonInput={(ev) => {
            if (isDirty === false) {
              setIsDirty(true);
            }
            onValueChange(ev);
          }}
          onIonBlur={() => setIsTouched(true)}
          placeholder={placeholder}
          rows={textAreaRows}
        ></IonTextarea>
      ) : (
        <IonInput
          fill="outline"
          label={label}
          labelPlacement={labelPosition}
          className={`${isValid && "ion-valid"} ${
            isValid === false && "ion-invalid"
          } ${isTouched && "ion-touched"}`}
          type={type}
          required={required}
          value={value}
          placeholder={placeholder}
          errorText={error}
          onIonInput={(ev) => {
            if (isDirty === false) {
              setIsDirty(true);
            }
            onValueChange(ev);
          }}
          onIonBlur={() => setIsTouched(true)}
        ></IonInput>
      )}
      {iconName && (
        <IonIcon
          icon={iconName}
          slot={iconSlot}
          class={iconClass}
          onClick={iconAction}
        ></IonIcon>
      )}
    </div>
  );
};
