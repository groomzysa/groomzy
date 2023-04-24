import { useIonAlert, useIonToast } from "@ionic/react";

export const useAlertInfo = () => {
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();

  const toastInfo = (
    message: string,
    position: "middle" | "middle" | "bottom"
  ) => {
    present({
      message: message,
      duration: 2500,
      position: position,
    });
  };

  const alertInfo = (
    message: string,
    onOK?: () => void,
    onCancel?: () => void
  ) =>
    presentAlert({
      header: "Info",
      message: message,
      backdropDismiss: false,
      buttons: [
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            if (!onOK) {
              return;
            }
            onOK();
          },
        },
        {
          text: "CANCEL",
          role: "cancel",
          handler: () => {
            if (!onCancel) {
              return;
            }
            onCancel();
          },
        },
      ],
    });

  return { toastInfo, alertInfo };
};
