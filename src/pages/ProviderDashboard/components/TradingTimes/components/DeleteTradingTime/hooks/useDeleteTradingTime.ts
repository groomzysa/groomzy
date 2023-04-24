import { AgGridReact } from "ag-grid-react";
import { RefObject, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteOperatingTime } from "../../../../../../../api/hooks/mutations";
import { routes } from "../../../../../../../route/routes";
import { DELETED_OPERATING_TIME_MESSAGE } from "../../../../../../../utils/messages";
import { useSuccessControl } from "../../../../../../../hooks/useSuccessControl";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useDeleteTradingTime = (gridRef: RefObject<AgGridReact<any>>) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const gridApi = gridRef.current?.api;
  let deleteOperatingTimeLoading = false;

  /**
   *
   * Hooks
   *
   */
  const { id } = useParams<{ id: string }>();
  const { successControl } = useSuccessControl();
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
    deleteOperatingTimeLoading = true;

    try {
      await deleteOperatingTime({
        operatingTimeId: Number(id),
      }).unwrap();

      deleteOperatingTimeLoading = false;

      successControl(DELETED_OPERATING_TIME_MESSAGE, onCloseModal);
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      deleteOperatingTimeLoading = false;
      successControl(
        getErrorMessage(error as ErrorResponse) ||
          "Something went wrong deleting Operating time."
      );
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
