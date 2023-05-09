import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteService as useDeleteServiceMutation } from "../../../../../../../api/hooks/mutations";
import { routes } from "../../../../../../../route/routes";
import { DELETED_SERVICE_MESSAGE } from "../../../../../../../utils/messages";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useDeleteService = (
  gridRef: React.RefObject<AgGridReact<any>>
) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const gridApi = gridRef.current?.api;
  const [deleteServiceLoading, setDeleteServiceLoading] = useState(false);

  /**
   *
   * Hooks
   *
   */
  const { id } = useParams<{ id: string }>();

  const { autoDisimissToast } = useCustomToast();

  const { deleteService } = useDeleteServiceMutation();

  const history = useHistory();

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

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [id, history]);

  /**
   *
   * Handlers
   *
   */

  const onDeleteService = async () => {
    setDeleteServiceLoading(true);
    try {
      await deleteService({
        serviceId: Number(id),
      }).unwrap();

      setDeleteServiceLoading(false);

      autoDisimissToast({ message: DELETED_SERVICE_MESSAGE, onCloseModal });
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setDeleteServiceLoading(false);
      autoDisimissToast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong deleting service.",
        buttonDismiss: true,
      });
    }
  };

  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.services.use()}`);
  }

  return {
    isOpen,
    deleteServiceLoading,
    onDeleteService,
    onCloseModal,
  };
};
