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
import { useTradingTimeActions } from "./hooks";

export const TradingTimesActions: FC<IServiceActionsProps> = ({ props }) => {
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
  } = useTradingTimeActions();

  return (
    <IonGrid class="day-field">
      <IonRow class="day-field">
        <IonCol class="day-field day">
          <span title={data?.day}>{data?.day}</span>
        </IonCol>
        {node.isSelected() && (
          <IonCol class="icon-container day-field">
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
