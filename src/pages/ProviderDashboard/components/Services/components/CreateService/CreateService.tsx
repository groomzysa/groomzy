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
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import { FC } from "react";
import { closeOutline } from "ionicons/icons";
import "./styles.css";
import { GInput, GSelect } from "../../../../../../components";
import { useCreateService } from "./hooks";
import { DurationUnitType } from "../../../../../../api/graphql/api.schema";
import { ICreateServiceProps } from "./types";

export const CreateService: FC<ICreateServiceProps> = ({ gridRef }) => {
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
    createServiceLoading,
    isOpen,
    categories,
    isKeyboardOpen,
    onNameChange,
    onDescriptionChange,
    onPriceChange,
    onDurationChange,
    onCategoryChange,
    onDurationUnitChange,
    onCreateService,
    onCloseModal,
    onCanCreateService,
  } = useCreateService(gridRef);

  return (
    <IonModal
      className="create-service-modal"
      isOpen={isOpen}
      backdropDismiss={false}
    >
      <IonContent>
        <IonToolbar>
          <IonTitle>Create service</IonTitle>
          <IonIcon
            slot="end"
            className="create-service-close-icon"
            icon={closeOutline}
            onClick={onCloseModal}
          ></IonIcon>
        </IonToolbar>
        <form
          className={
            isKeyboardOpen
              ? "create-service-form-keyboard-on"
              : "create-service-form"
          }
        >
          <IonGrid>
            <IonRow>
              <IonCol>
                <GSelect
                  label="Category"
                  value={category?.value}
                  options={categories}
                  onSelectChange={onCategoryChange}
                  placeholder="Select category (required)"
                  error={category?.error}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <GInput
                  label="Name"
                  labelPosition="floating"
                  onValueChange={onNameChange}
                  type="text"
                  value={name?.value || ""}
                  error={name?.error}
                  required
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <GInput
                  label="Price"
                  labelPosition="floating"
                  onValueChange={onPriceChange}
                  type="number"
                  value={price?.value || ""}
                  error={price?.error}
                  required
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="create-service-duration-container">
                <GInput
                  label="Duration"
                  labelPosition="floating"
                  onValueChange={onDurationChange}
                  type="number"
                  value={duration?.value || ""}
                  error={duration?.error}
                  required
                />
                <IonRadioGroup
                  className="create-service-duration-units-container"
                  value={durationUnit}
                  onIonChange={(e) => onDurationUnitChange(e.target.value)}
                >
                  <IonRadio labelPlacement="end" value={DurationUnitType.Min}>
                    Min
                  </IonRadio>

                  <IonRadio labelPlacement="end" value={DurationUnitType.Hrs}>
                    Hrs
                  </IonRadio>
                </IonRadioGroup>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <GInput
                  type="text"
                  label="Description"
                  labelPosition="floating"
                  onValueChange={onDescriptionChange}
                  value={description?.value || ""}
                  error={description?.error}
                  textAreaRows={5}
                  required
                  textArea
                />
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonButtons>
            <IonButton
              fill="outline"
              color="primary"
              onClick={onCreateService}
              disabled={!onCanCreateService() || createServiceLoading}
            >
              {createServiceLoading ? "Creating..." : "Create"}
            </IonButton>
            <IonButton
              fill="outline"
              color="danger"
              onClick={onCloseModal}
              disabled={createServiceLoading}
            >
              Cancel
            </IonButton>
          </IonButtons>
        </form>
      </IonContent>
    </IonModal>
  );
};
