import { AgGridReact } from "ag-grid-react";
import { isEmpty } from "lodash";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { useCreateStaff as useCreateStaffMutation } from "../../../../../../../api/hooks/mutations";
import { routes } from "../../../../../../../route/routes";
import { CREATE_STAFF_MESSAGE } from "../../../../../../../utils/messages";
import { IInput } from "../../../../../../../utils/types";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useCreateStaff = (gridRef: RefObject<AgGridReact<any>>) => {
  const [firstName, setFirstName] = useState<IInput<string>>();
  const [lastName, setLastName] = useState<IInput<string>>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const history = useHistory();
  const gridApi = gridRef.current?.api;
  const [createStaffLoading, setCreateStaffLoading] = useState(false);

  /**
   *
   * Hooks
   *
   */
  const { autoDisimissToast } = useCustomToast();

  const { createStaff } = useCreateStaffMutation();

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.staffs.use()}`);
  }, [history, setIsOpen]);

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    setIsOpen(true);

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [history]);

  /**
   *
   * Handlers
   *
   */
  const onInputCheckUpdate = (
    value: string,
    error: string,
    setValue: Dispatch<SetStateAction<IInput<any> | undefined>>
  ) => {
    if (!value) {
      setValue({ value, error });
    } else {
      setValue({ value, error: "" });
    }
  };

  const onFirstNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "First name is required.", setFirstName);
  };

  const onLastNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "Last name is required.", setLastName);
  };

  const onCanCreateStaff = (): boolean => {
    const error = !isEmpty(firstName?.error) || !isEmpty(lastName?.error);
    const missingFilled = isEmpty(firstName?.value) || isEmpty(lastName?.value);

    return !error && !missingFilled;
  };

  const onCreateStaff = async () => {
    if (!onCanCreateStaff()) {
      return;
    }

    setCreateStaffLoading(true);

    try {
      await createStaff({
        firstName: firstName!.value,
        lastName: lastName!.value,
      }).unwrap();

      setCreateStaffLoading(false);

      autoDisimissToast({ message: CREATE_STAFF_MESSAGE, onCloseModal });
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setCreateStaffLoading(false);
      autoDisimissToast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong creating staff.",
        buttonDismiss: true,
      });
    }
  };

  return {
    firstName,
    lastName,
    createStaffLoading,
    isOpen,
    onFirstNameChange,
    onLastNameChange,
    onCreateStaff,
    onCloseModal,
    onCanCreateStaff,
  };
};
