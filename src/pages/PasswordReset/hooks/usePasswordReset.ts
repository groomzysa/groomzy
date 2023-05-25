import { useHistory } from "react-router";
import { useNativeElementsSizeInfo } from "../../../hooks";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { useResetPassword } from "../../../api/hooks/mutations";
import { useState } from "react";
import { IInput } from "../../../utils/types";
import { isEmpty } from "lodash";
import { getErrorMessage } from "../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { routes } from "../../../route/routes";

export const usePasswordReset = () => {
  const [password, setPassword] = useState<IInput<string>>();
  const [passwordResetOTP, setPasswordResetOTP] = useState<IInput<string>>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [resetPasswordLoading, setResetPasswordLoading] =
    useState<boolean>(false);

  /**
   *
   * Hooks
   *
   */
  const { isKeyboardOpen } = useNativeElementsSizeInfo();

  const { toast } = useCustomToast();

  const { resetPassword } = useResetPassword();

  const history = useHistory();

  /**
   *
   * Handlers
   *
   */
  const onPasswordChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    if (value.length < 5) {
      setPassword({ value, error: "Password is too short!" });
    } else {
      setPassword({ value, error: "" });
    }
  };

  const onPasswordResetOTPChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    if (!value) {
      setPasswordResetOTP({ value, error: "Password reset OTP is required!" });
    } else {
      setPasswordResetOTP({ value, error: "" });
    }
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onCanResetPassword = (): boolean => {
    const error =
      !isEmpty(password?.error) || !isEmpty(passwordResetOTP?.error);
    const missingFilled =
      isEmpty(password?.value) || isEmpty(passwordResetOTP?.value);

    return !error && !missingFilled;
  };

  const onResetPassword = async () => {
    if (!onCanResetPassword()) {
      return;
    }

    setResetPasswordLoading(true);

    try {
      const response = await resetPassword({
        password: password?.value!,
        passwordResetOTP: passwordResetOTP?.value!,
      }).unwrap();
      setResetPasswordLoading(false);
      toast({ message: response.resetPassword.message });
      setTimeout(() => {
        history.push(`/${routes.signIn.base.use()}`);
      }, 2500);
    } catch (error) {
      setResetPasswordLoading(false);
      toast({
        message: getErrorMessage(error as ErrorResponse) || "",
        buttonDismiss: true,
      });
    }
  };

  return {
    password,
    passwordResetOTP,
    showPassword,
    isKeyboardOpen,
    resetPasswordLoading,
    onPasswordChange,
    onShowPassword,
    onCanResetPassword,
    onResetPassword,
    onPasswordResetOTPChange,
  };
};
