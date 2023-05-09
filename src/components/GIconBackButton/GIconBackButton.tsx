import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { IGIconBackButtonProps } from "./types";
import "./styles.css";

export const GIconBackButton: FC<IGIconBackButtonProps> = ({ route }) => {
  const history = useHistory();
  return (
    <IonIcon
      class="g-icon-back-button"
      icon={arrowBack}
      onClick={() => {
        history.push(route);
      }}
    ></IonIcon>
  );
};
