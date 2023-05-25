import { AgGridReact } from "ag-grid-react";
import { RefObject, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteOperatingTime } from "../../../../../../../api/hooks/mutations";
import { routes } from "../../../../../../../route/routes";
import { DELETED_OPERATING_TIME_MESSAGE } from "../../../../../../../utils/messages";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useDeleteTradingTime = (gridRef: RefObject<AgGridReact<any>>) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const gridApi = gridRef.current?.api;
  const [deleteOperatingTimeLoading, setDeleteOperatingTimeLoading] =
    useState(false);

  /**
   *
   * Hooks
   *
   */
  const { id } = useParams<{ id: string }>();
  const { toast } = useCustomToast();
  const { deleteOperatingTime } = useDeleteOperatingTime();

  const history = useHistory();

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

  const onDeleteOperatingTime = async () => {
    setDeleteOperatingTimeLoading(true);

    try {
      await deleteOperatingTime({
        operatingTimeId: Number(id),
      }).unwrap();

      setDeleteOperatingTimeLoading(false);

      toast({
        message: DELETED_OPERATING_TIME_MESSAGE,
        onCloseModal,
      });
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setDeleteOperatingTimeLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong deleting Operating time.",
        buttonDismiss: true,
      });
    }
  };

  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.tradingTimes.use()}`);
  }

  return {
    isOpen,
    deleteOperatingTimeLoading,
    onDeleteOperatingTime,
    onCloseModal,
  };
};
