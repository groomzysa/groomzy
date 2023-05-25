import { AgGridReact } from "ag-grid-react";
import { RefObject, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useUpdateStaff as useUpdateStaffMutation } from "../../../../../../../api/hooks/mutations";
import { useFetchStaff } from "../../../../../../../api/hooks/queries";
import { routes } from "../../../../../../../route/routes";
import { UPDATE_STAFF_MESSAGE } from "../../../../../../../utils/messages";
import { IInput } from "../../../../../../../utils/types";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { useNativeElementsSizeInfo } from "../../../../../../../hooks";

export const useUpdateStaff = (gridRef: RefObject<AgGridReact<any>>) => {
  const [firstName, setFirstName] = useState<IInput<string>>();
  const [lastName, setLastName] = useState<IInput<string>>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const gridApi = gridRef.current?.api;
  const [updateStaffLoading, setUpdateStaffLoading] = useState(false);

  /**
   *
   * Hooks
   *
   */
  const { id } = useParams<{ id: string }>();
  const { toast } = useCustomToast();
  const { isKeyboardOpen } = useNativeElementsSizeInfo();
  const { fetchStaff, staffError, staffLoading, staff } = useFetchStaff();
  const { updateStaff } = useUpdateStaffMutation();
  const history = useHistory();

  /**
   *
   * States checks
   *
   */
  if (staffError) {
    toast({
      message: staffError || "Something went wrong, updating staff.",
      buttonDismiss: true,
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

  const onFirstNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setFirstName({ value });
  };

  const onLastNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setLastName({ value });
  };

  const onUpdateStaff = async () => {
    setUpdateStaffLoading(true);

    try {
      await updateStaff({
        staffId: Number(id),
        firstName: firstName?.value,
        lastName: lastName?.value,
      }).unwrap();

      setUpdateStaffLoading(false);
      toast({ message: UPDATE_STAFF_MESSAGE, onCloseModal });
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setUpdateStaffLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong, updating staff.",
        buttonDismiss: true,
      });
    }
  };

  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.staffs.use()}`);
  }

  return {
    firstName,
    lastName,
    updateStaffLoading,
    staff,
    staffLoading,
    isOpen,
    isKeyboardOpen,
    onFirstNameChange,
    onLastNameChange,
    onUpdateStaff,
    onCloseModal,
  };
};
