import { useIonToast } from "@ionic/react";

export const useSuccessControl = () => {
  const [present] = useIonToast();

  const successControl = (message: string, onClose?: () => void) => {
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 0);
    }

    present({
      message,
      duration: 2000,
      position: "middle",
    });
  };

  return {
    successControl,
  };
};
