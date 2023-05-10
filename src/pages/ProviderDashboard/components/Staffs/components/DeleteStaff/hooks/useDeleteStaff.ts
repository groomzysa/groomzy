import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteStaff as useDeleteStaffMutation } from "../../../../../../../api/hooks/mutations";
import { routes } from "../../../../../../../route/routes";
import { DELETED_STAFF_MESSAGE } from "../../../../../../../utils/messages";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useDeleteStaff = (gridRef: React.RefObject<AgGridReact<any>>) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const gridApi = gridRef.current?.api;
  const [deleteStaffLoading, setDeleteStaffLoading] = useState(false);

  /**
   *
   * Hooks
   *
   */
  const { id } = useParams<{ id: string }>();

  const { autoDisimissToast } = useCustomToast();

  const { deleteStaff } = useDeleteStaffMutation();

  const history = useHistory();

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

  const onDeleteStaff = async () => {
    setDeleteStaffLoading(true);
    try {
      await deleteStaff({
        staffId: Number(id),
      }).unwrap();

      setDeleteStaffLoading(false);

      autoDisimissToast({ message: DELETED_STAFF_MESSAGE, onCloseModal });
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setDeleteStaffLoading(false);
      autoDisimissToast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong deleting staff.",
        buttonDismiss: true,
      });
    }
  };

  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.staffs.use()}`);
  }

  return {
    isOpen,
    deleteStaffLoading,
    onDeleteStaff,
    onCloseModal,
  };
};
