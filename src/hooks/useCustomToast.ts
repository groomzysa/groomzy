import { useIonToast } from "@ionic/react";

export const useCustomToast = () => {
  const [present, dismiss] = useIonToast();

  const toast = ({
    message,
    position = "middle",
    duration = 2000,
    buttonDismiss = false,
    onCloseModal,
  }: {
    message: string;
    position?: "middle" | "top" | "bottom";
    duration?: number;
    buttonDismiss?: boolean;
    onCloseModal?: () => void;
  }) => {
    if (onCloseModal) {
      setTimeout(() => {
        onCloseModal();
      }, 0);
    }

    present({
      message,
      duration: buttonDismiss ? undefined : duration,
      position,
      layout: buttonDismiss ? "stacked" : undefined,
      buttons: buttonDismiss
        ? [
            {
              text: "Ok",
              handler: () => {
                dismiss();
              },
            },
          ]
        : undefined,
    });
  };

  return {
    toast,
  };
};
