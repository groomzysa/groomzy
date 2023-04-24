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
import { FC } from "react";

import { IServiceActionsProps } from "./types";
import "./styles.css";
import { useServiceActions } from "./hooks";

export const ServiceActions: FC<IServiceActionsProps> = ({ props }) => {
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
    onDeleteService,
    onUpdateService,
    onViewService,
  } = useServiceActions();

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
                    onClick={() => {
                      onViewService(data?.id);
                    }}
                  >
                    View
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel
                    class="action"
                    onClick={() => onUpdateService(data?.id)}
                  >
                    Update
                  </IonLabel>
                </IonItem>

                <IonItem lines="none">
                  <IonLabel
                    class="action"
                    onClick={() => onDeleteService(data?.id)}
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
