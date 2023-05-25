import { FC } from "react";
import { IGalleryImageActionsProps } from "./types";
import { useGalleryImageActions } from "./hooks";
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonRow,
} from "@ionic/react";
import { ellipsisVerticalOutline } from "ionicons/icons";
import "./styles.css";

export const GalleryImageActions: FC<IGalleryImageActionsProps> = ({
  props,
}) => {
  const { data, node } = props;

  /**
   *
   * Hooks
   *
   */
  const {
    popoverOpen,
    popover,
    onOpenPopover,
    onClosePopover,
    onDeleteGallery,
  } = useGalleryImageActions();
  return (
    <IonGrid className="name-field">
      <IonRow className="name-field">
        <IonCol className="name-field name">
          <span title={data?.name}>{data?.name}</span>
        </IonCol>
        {node.isSelected() && (
          <IonCol className="icon-container name-field">
            <span
              title="Actions"
              className="ellipse-icon-container"
              onClick={onOpenPopover}
            >
              <IonIcon
                icon={ellipsisVerticalOutline}
                className="ellipse-icon"
              ></IonIcon>
            </span>
            <IonPopover
              className="actions"
              ref={popover}
              isOpen={popoverOpen}
              onWillDismiss={onClosePopover}
            >
              <IonList>
                <IonItem lines="none">
                  <IonLabel
                    className="action"
                    onClick={() => onDeleteGallery(data?.id)}
                  >
                    Delete
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonPopover>
          </IonCol>
        )}
      </IonRow>
    </IonGrid>
  );
};
