import { useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFetchStaff } from "../../../../../../../api/hooks/queries";
import { routes } from "../../../../../../../route/routes";

export const useViewStaff = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [present] = useIonToast();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  /**
   *
   * Hooks
   *
   */
  const { fetchStaff, staffError, staffLoading, staff } = useFetchStaff();

  /**
   *
   * States checks
   *
   */

  if (staffError) {
    present({
      message: staffError || "Something went wrong, fetching data.",
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
      history.push(`/${routes.providerDashboard.staffs.use()}`);

      return;
    }

    setIsOpen(true);

    fetchStaff({ staffId: Number(id) });

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [id, fetchStaff, history]);

  /**
   *
   * Handlers
   *
   */
  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.staffs.use()}`);
  }

  return {
    staffLoading,
    staff,
    isOpen,
    onCloseModal,
  };
};
