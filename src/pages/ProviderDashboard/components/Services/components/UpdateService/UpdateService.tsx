import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButtons,
  IonButton,
  IonRadio,
  IonRadioGroup,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { FC } from "react";
import { closeOutline } from "ionicons/icons";
import "./styles.css";
import { GInput, GSelect } from "../../../../../../components";
import { useUpdateService } from "./hooks";
import { DurationUnitType } from "../../../../../../api/graphql/api.schema";
import { IUpdateServiceProps } from "./types";
import { formatCategoryLabel } from "../../utils";

export const UpdateService: FC<IUpdateServiceProps> = ({ gridRef }) => {
  /**
   *
   * Custom hooks
   *
   */

  const {
    name,
    description,
    price,
    duration,
    durationUnit,
    category,
    updateServiceLoading,
    service,
    serviceLoading,
    isOpen,
    categories,
    isKeyboardOpen,
    onNameChange,
    onDescriptionChange,
    onPriceChange,
    onDurationChange,
    onCategoryChange,
    onDurationUnitChange,
    onUpdateService,
    onCloseModal,
  } = useUpdateService(gridRef);

  return (
    <IonModal
      isOpen={isOpen}
      backdropDismiss={false}
      className="update-service-modal"
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Update service</IonTitle>
          <IonIcon
            slot="end"
            className="update-service-close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>

        {serviceLoading ? (
          <IonSpinner
            color="primary"
            className="ion-justify-content-center"
          ></IonSpinner>
        ) : (
          <form
            className={
              isKeyboardOpen
                ? "update-service-form-keyboard-on"
                : "update-service-form"
            }
          >
            <IonGrid>
              <IonRow>
                <IonCol>
                  <GSelect
                    label={"Catedory"}
                    value={category}
                    options={categories}
                    onSelectChange={onCategoryChange}
                    placeholder={
                      service?.category
                        ? formatCategoryLabel(service?.category)
                        : "Select category"
                    }
                    error={category?.error}
                  />
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <GInput
                    label="Name"
                    labelPosition={service ? "stacked" : "floating"}
                    onValueChange={onNameChange}
                    type="text"
                    value={name?.value || ""}
                    placeholder={service?.name || ""}
                  />
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <GInput
                    label="Price"
                    labelPosition={service ? "stacked" : "floating"}
                    onValueChange={onPriceChange}
                    type="number"
                    value={price?.value || ""}
                    placeholder={service?.price?.toString()}
                  />
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <div className="update-service-duration-container">
                    <GInput
                      type="text"
                      label="Duration"
                      labelPosition={service ? "stacked" : "floating"}
                      onValueChange={onDurationChange}
                      value={duration?.value || ""}
                      placeholder={service?.duration?.toString()}
                    />
                    <IonRadioGroup
                      className="update-service-duration-units-container"
                      value={service?.durationUnit || durationUnit}
                      onIonChange={(e) => onDurationUnitChange(e.target.value)}
                    >
                      <IonRadio
                        labelPlacement="end"
                        value={DurationUnitType.Min}
                      >
                        Min
                      </IonRadio>

                      <IonRadio
                        labelPlacement="end"
                        value={DurationUnitType.Hrs}
                      >
                        Hrs
                      </IonRadio>
                    </IonRadioGroup>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <GInput
                    type="text"
                    label="Description"
                    labelPosition={service ? "stacked" : "floating"}
                    onValueChange={onDescriptionChange}
                    value={description?.value || ""}
                    placeholder={service?.description || ""}
                    textAreaRows={5}
                    textArea
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonButtons>
              <IonButton
                fill="outline"
                color="primary"
                onClick={onUpdateService}
                disabled={updateServiceLoading}
              >
                {updateServiceLoading ? "Updating..." : "Update"}
              </IonButton>
              <IonButton
                fill="outline"
                color="danger"
                onClick={onCloseModal}
                disabled={updateServiceLoading}
              >
                Cancel
              </IonButton>
            </IonButtons>
          </form>
        )}
      </IonContent>
    </IonModal>
  );
};
