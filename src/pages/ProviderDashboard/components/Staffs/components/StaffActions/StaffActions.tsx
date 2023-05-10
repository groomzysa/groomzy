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
import { FC } from "react";

import { IStaffActionsProps } from "./types";
import "./styles.css";
import { useStaffActions } from "./hooks";

export const StaffActions: FC<IStaffActionsProps> = ({ props }) => {
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
    onDeleteStaff,
    onUpdateStaff,
    onViewStaff,
  } = useStaffActions();

  return (
    <IonGrid class="name-field">
      <IonRow class="name-field">
        <IonCol class="name-field name">
          <span title={data?.firstName}>{data?.firstName}</span>
        </IonCol>
        {node.isSelected() && (
          <IonCol class="icon-container name-field">
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
                      onViewStaff(data?.id);
                    }}
                  >
                    View
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel
                    class="action"
                    onClick={() => onUpdateStaff(data?.id)}
                  >
                    Update
                  </IonLabel>
                </IonItem>

                <IonItem lines="none">
                  <IonLabel
                    class="action"
                    onClick={() => onDeleteStaff(data?.id)}
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
