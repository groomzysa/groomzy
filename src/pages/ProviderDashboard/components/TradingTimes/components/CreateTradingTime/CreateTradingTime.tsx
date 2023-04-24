import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButtons,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { FC } from "react";
import TimePicker from "react-time-picker";
import { closeOutline } from "ionicons/icons";
import "./styles.css";
import { useCreateTradingTime } from "./hooks";
import { ICreateTradingTimeProps } from "./types";
import { GSelect } from "../../../../../../components";

export const CreateTradingTime: FC<ICreateTradingTimeProps> = ({ gridRef }) => {
  /**
   *
   * Hooks
   *
   */

  const {
    day,
    opens,
    closes,
    isOpen,
    createOperatingTimeLoading,
    dayOptions,
    onDayChange,
    onOpensChange,
    onClosesChange,
    onCloseModal,
    onCreateOperatingTime,
    onCanCreateOperatingTime,
  } = useCreateTradingTime(gridRef);

  return (
    <IonModal
      isOpen={isOpen}
      backdropDismiss={false}
      className="create-trading-time-modal"
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Create trading time</IonTitle>
          <IonIcon
            slot="end"
            className="create-trading-time-close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol>
              <GSelect
                label="Day"
                value={day?.value}
                options={dayOptions}
                onSelectChange={onDayChange}
                placeholder="Select day (required)"
                error={day?.error}
              />
            </IonCol>
          </IonRow>
          <IonRow class="ion-align-items-center">
            <IonCol>
              <IonText>Opens:</IonText>
            </IonCol>
            <IonCol class="create-tradint-time-time-container ion-justify-content-end">
              <TimePicker
                onChange={(value) => onOpensChange(value)}
                value={opens?.value || ""}
                clockIcon={null}
                disableClock={true}
                format="HH:mm"
                required
              />
            </IonCol>
          </IonRow>
          <IonRow class="ion-align-items-center">
            <IonCol>
              <IonText>Closes:</IonText>
            </IonCol>
            <IonCol class="create-tradint-time-time-container ion-justify-content-end">
              <TimePicker
                onChange={(value) => onClosesChange(value)}
                value={closes?.value || ""}
                clockIcon={null}
                disableClock={true}
                format="HH:mm"
                required
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButtons>
                <IonButton
                  fill="outline"
                  color="primary"
                  onClick={onCreateOperatingTime}
                  disabled={
                    !onCanCreateOperatingTime() || createOperatingTimeLoading
                  }
                >
                  {createOperatingTimeLoading ? "Creating..." : "Create"}
                </IonButton>
                <IonButton
                  fill="outline"
                  color="danger"
                  onClick={onCloseModal}
                  disabled={createOperatingTimeLoading}
                >
                  Cancel
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};
