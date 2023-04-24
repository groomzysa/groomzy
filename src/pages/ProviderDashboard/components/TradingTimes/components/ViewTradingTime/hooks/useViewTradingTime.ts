import { useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFetchOperatingTime } from "../../../../../../../api/hooks/queries";
import { routes } from "../../../../../../../route/routes";

export const useViewTradingTime = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [present] = useIonToast();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  /**
   *
   * Hooks
   *
   */
  const {
    fetchOperatingTime,
    operatingTime,
    operatingTimeError,
    operatingTimeHasError,
    operatingTimeLoading,
  } = useFetchOperatingTime();

  /**
   *
   * States checks
   *
   */

  if (operatingTimeHasError) {
    present({
      message: operatingTimeError || "Something went wrong, fetching data.",
      duration: 2500,
      position: "middle",
    });
  }

  /**
   *
   * Effects
   *
   */

  useEffect(() => {
    if (!id) {
      history.push(`/${routes.providerDashboard.tradingTimes.use()}`);

      return;
    }

    setIsOpen(true);

    fetchOperatingTime({ operatingTimeId: Number(id) });

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [id, fetchOperatingTime, history]);

  /**
   *
   * Handlers
   *
   */
  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.tradingTimes.use()}`);
  }

  return {
    operatingTimeLoading,
    operatingTime,
    isOpen,
    onCloseModal,
  };
};
