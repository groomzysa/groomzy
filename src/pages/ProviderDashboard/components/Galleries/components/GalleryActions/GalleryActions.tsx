import { FC } from "react";
import { IGalleryActionsProps } from "./types";
import { useGalleryActions } from "./hooks";
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
import { ellipsisHorizontalOutline } from "ionicons/icons";

export const GalleryActions: FC<IGalleryActionsProps> = ({ props }) => {
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
  } = useGalleryActions();
  return (
    <IonGrid class="name-field">
      <IonRow class="name-field">
        <IonCol class="name-field name">
          <span title={data?.name}>{data?.name}</span>
        </IonCol>
        {node.isSelected() && (
          <IonCol class="icon-container name-field">
            <span
              title="Actions"
              className="ellipse-icon-container"
              onClick={onOpenPopover}
            >
              <IonIcon
                icon={ellipsisHorizontalOutline}
                className="ellipse-icon"
              ></IonIcon>
            </span>
            <IonPopover
              class="actions"
              ref={popover}
              isOpen={popoverOpen}
              onWillDismiss={onClosePopover}
            >
              <IonList>
                <IonItem lines="none">
                  <IonLabel
                    class="action"
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
