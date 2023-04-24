import { useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFetchService } from "../../../../../../../api/hooks/queries";
import { routes } from "../../../../../../../route/routes";

export const useViewService = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [present] = useIonToast();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  /**
   *
   * Hooks
   *
   */
  const { fetchService, serviceError, serviceLoading, service } =
    useFetchService();

  /**
   *
   * States checks
   *
   */

  if (serviceError) {
    present({
      message: serviceError || "Something went wrong, fetching data.",
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
      history.push(`/${routes.providerDashboard.services.use()}`);

      return;
    }

    setIsOpen(true);

    fetchService({ serviceId: Number(id) });

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [id, fetchService, history]);

  /**
   *
   * Handlers
   *
   */
  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.services.use()}`);
  }

  return {
    serviceLoading,
    service,
    isOpen,
    onCloseModal,
  };
};
