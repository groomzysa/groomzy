import { isEmpty } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { UserRole } from "../../../api/graphql/api.schema";
import { getErrorMessage, storeToken } from "../../../api/helpers";
import { useSignIn } from "../../../api/hooks/mutations";
import { routes } from "../../../route/routes";
import { IInput } from "../../../utils/types";
import isEmail from "validator/lib/isEmail";
import { useNativeElementsSizeInfo } from "../../../hooks";
import { api } from "../../../api";
import { setToken } from "../../../store/slices/appSlice/appSlice";
import { useSuccessControl } from "../../../hooks/useSuccessControl";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useSignInHandlers = () => {
  const [email, setEmail] = useState<IInput<string>>();
  const [password, setPassword] = useState<IInput<string>>();
  const [isProvider, setIsProvider] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  /**
   *
   * Hooks
   *
   */
  const { successControl } = useSuccessControl();

  const { isKeyboardOpen, keyboardHeight, topToolBarHeight } =
    useNativeElementsSizeInfo();
  const { signInTrigger } = useSignIn();
  const dispatch = useDispatch();
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

  const onPasswordChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    if (value.length < 5) {
      setPassword({ value, error: "Password is too short!" });
    } else {
      setPassword({ value, error: "" });
    }
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onIsProvider = () => {
    setIsProvider(!isProvider);
  };

  const onCanSignIn = (): boolean => {
    const error = !isEmpty(email?.error) || !isEmpty(password?.error);
    const missingFilled = isEmpty(email?.value) || isEmpty(password?.value);

    return !error && !missingFilled;
  };

  const onForgotPassword = () => {
    history.push(`/${routes.requestPasswordReset.base.get()}`);
  };

  const onNewMember = () => {
    history.push(`/${routes.signUp.base.use()}`);
  };

  const onSignIn = async () => {
    if (!onCanSignIn()) return;

    setSignInLoading(true);

    try {
      const response = await signInTrigger({
        email: email?.value!,
        password: password?.value!,
        role: isProvider ? UserRole.Provider : UserRole.Client,
      }).unwrap();

      const { token, user } = response.signIn;

      storeToken(token);
      dispatch(setToken({ token }));
      dispatch(api.util.invalidateTags(["User"]));

      if (user?.role === UserRole.Provider) {
        history.push(`/${routes.providerDashboard.base.use()}`);
      } else {
        history.push(`/${routes.home.base.use()}`);
      }
    } catch (error) {
      successControl(getErrorMessage(error as ErrorResponse) || "", undefined);
    }
  };

  return {
    signInLoading,
    email,
    password,
    isProvider,
    showPassword,
    keyboardHeight,
    topToolBarHeight,
    isKeyboardOpen,
    setIsProvider,
    onPasswordChange,
    onEmailChange,
    onNewMember,
    onForgotPassword,
    onSignIn,
    onShowPassword,
    onIsProvider,
    onCanSignIn,
  };
};
