import { useState } from "react";
import { useNativeElementsSizeInfo } from "../../../hooks";
import { IInput } from "../../../utils/types";
import isEmail from "validator/lib/isEmail";
import { useRequestPasswordReset as useRequestPasswordResetMutation } from "../../../api/hooks/mutations";
import { isEmpty } from "lodash";
import { UserRole } from "../../../api/graphql/api.schema";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { useHistory } from "react-router";
import { routes } from "../../../route/routes";

export const useRequestPasswordReset = () => {
  const [email, setEmail] = useState<IInput<string>>();
  const [isProvider, setIsProvider] = useState<boolean>(false);
  const [requestPasswordResetLoading, setRequestPasswordResetLoading] =
    useState<boolean>(false);

  /**
   *
   * Hooks
   *
   */
  const { isKeyboardOpen, topToolBarHeight } = useNativeElementsSizeInfo();

  const { autoDisimissToast } = useCustomToast();

  const { requestPasswordReset } = useRequestPasswordResetMutation();

  const history = useHistory();

  /**
   *
   * Handlers
   *
   */
  const onEmailChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    if (!isEmail(value)) {
      setEmail({ value, error: "Email is invalid." });
    } else {
      setEmail({ value, error: "" });
    }
  };

  const onIsProvider = () => {
    setIsProvider(!isProvider);
  };

  const onCanRequestPasswordReset = (): boolean => {
    const error = !isEmpty(email?.error);
    const missingFilled = isEmpty(email?.value);

    return !error && !missingFilled;
  };

  const onRequestPasswordReset = async () => {
    if (!onCanRequestPasswordReset()) {
      return;
    }

    setRequestPasswordResetLoading(true);

    try {
      const response = await requestPasswordReset({
        email: email?.value!,
        role: isProvider ? UserRole.Provider : UserRole.Client,
      }).unwrap();
      setRequestPasswordResetLoading(false);
      autoDisimissToast({ message: response.requestPasswordReset.message });
      history.push(`/${routes.passwordReset.base.use()}`);
    } catch (error) {
      setRequestPasswordResetLoading(false);
      autoDisimissToast({
        message: getErrorMessage(error as ErrorResponse) || "",
        buttonDismiss: true,
      });
    }
  };

  return {
    email,
    isProvider,
    isKeyboardOpen,
    topToolBarHeight,
    requestPasswordResetLoading,
    onEmailChange,
    onIsProvider,
    onRequestPasswordReset,
    onCanRequestPasswordReset,
  };
};
