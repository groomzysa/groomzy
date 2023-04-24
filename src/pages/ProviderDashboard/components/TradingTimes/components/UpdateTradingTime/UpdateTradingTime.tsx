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
  IonSpinner,
} from "@ionic/react";
import { FC } from "react";
import TimePicker from "react-time-picker";
import { closeOutline } from "ionicons/icons";
import "./styles.css";
import { useUpdateTradingTime } from "./hooks";
import { IUpdateTradingTimeProps } from "./types";
import { GSelect } from "../../../../../../components";

export const UpdateTradingTime: FC<IUpdateTradingTimeProps> = ({ gridRef }) => {
  /**
   *
   * Hooks
   *
   */

  const {
    operatingTime,
    operatingTimeLoading,
    day,
    opens,
    closes,
    isOpen,
    updateOperatingTimeLoading,
    dayOptions,
    onDayChange,
    onOpensChange,
    onClosesChange,
    onCloseModal,
    onUpdateOperatingTime,
  } = useUpdateTradingTime(gridRef);

  return (
    <IonModal
      isOpen={isOpen}
      backdropDismiss={false}
      className="update-trading-time-modal"
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Update trading time</IonTitle>
          <IonIcon
            slot="end"
            className="update-trading-time-close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>

        <IonGrid>
          {operatingTimeLoading && (
            <IonRow>
              <IonCol>
                <IonSpinner
                  color="primary"
                  class="ion-justify-content-center"
                ></IonSpinner>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <GSelect
                label="Day"
                value={day?.value}
                options={dayOptions}
                onSelectChange={onDayChange}
                placeholder={operatingTime?.day || "Select day"}
                error={day?.error}
              />
            </IonCol>
          </IonRow>
          <IonRow class="ion-align-items-center">
            <IonCol>
              <IonText>Opens:</IonText>
            </IonCol>
            <IonCol class="update-trading-time-time-container ion-justify-content-end">
              <TimePicker
                onChange={(value) => onOpensChange(value)}
                value={opens?.value || ""}
                clockIcon={null}
                disableClock={true}
                hourPlaceholder={operatingTime?.opens?.split(":")?.[0] || "00"}
                minutePlaceholder={
                  operatingTime?.opens?.split(":")?.[1]?.split(" ")?.[0] || "00"
                }
                format="HH:mm"
              />
            </IonCol>
          </IonRow>
          <IonRow class="ion-align-items-center">
            <IonCol>
              <IonText>Closes:</IonText>
            </IonCol>
            <IonCol class="update-trading-time-time-container ion-justify-content-end">
              <TimePicker
                onChange={(value) => onClosesChange(value)}
                value={closes?.value || ""}
                clockIcon={null}
                disableClock={true}
                hourPlaceholder={operatingTime?.closes?.split(":")?.[0] || "00"}
                minutePlaceholder={
                  operatingTime?.closes?.split(":")?.[1]?.split(" ")?.[0] ||
                  "00"
                }
                format="HH:mm"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButtons>
                <IonButton
                  fill="outline"
                  color="primary"
                  onClick={onUpdateOperatingTime}
                  disabled={updateOperatingTimeLoading || operatingTimeLoading}
                >
                  {updateOperatingTimeLoading ? "Updating..." : "Update"}
                </IonButton>
                <IonButton
                  fill="outline"
                  color="danger"
                  onClick={onCloseModal}
                  disabled={updateOperatingTimeLoading || operatingTimeLoading}
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
