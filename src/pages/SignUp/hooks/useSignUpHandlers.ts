import { isEmpty } from "lodash";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { UserRole } from "../../../api/graphql/api.schema";
import { useAddUser } from "../../../api/hooks/mutations";
import { formatPathName } from "../../../route/routes";
import { SIGN_UP_MESSAGE } from "../../../utils/messages";
import { SIGN_IN } from "../../../utils/pages";
import { IInput } from "../../../utils/types";
import isEmail from "validator/lib/isEmail";
import { useNativeElementsSizeInfo } from "../../../hooks";

export const useSignUpHandlers = () => {
  const [firstName, setFirstName] = useState<IInput<string>>();
  const [lastName, setLastName] = useState<IInput<string>>();
  const [email, setEmail] = useState<IInput<string>>();
  const [password, setPassword] = useState<IInput<string>>();
  const [isProvider, setIsProvider] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>();

  /**
   *
   * Hooks
   *
   */
  const { isKeyboardOpen, topToolBarHeight } = useNativeElementsSizeInfo();

  const {
    addUserTrigger,
    addUser,
    addUserLoading,
    addUserHasError,
    addUserError,
  } = useAddUser();
  const history = useHistory();

  /**
   *
   * Effects
   *
   */

  useEffect(() => {
    if (!addUser) {
      return;
    }

    setSuccessMessage(SIGN_UP_MESSAGE);

    setTimeout(() => {
      history.replace(`/${formatPathName(SIGN_IN)}`);
    }, 5000);
  }, [addUser, history]);

  useEffect(() => {
    if (!successMessage) return;

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  }, [successMessage]);

  /**
   *
   * Handlers
   *
   */
  const onFirstNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    if (!value) {
      setFirstName({ value, error: "Name is required." });
    } else {
      setFirstName({ value, error: "" });
    }
  };

  const onLastNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    if (!value) {
      setLastName({ value, error: "Name is required." });
    } else {
      setLastName({ value, error: "" });
    }
  };

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

  const onIsProvider = () => {
    setIsProvider(!isProvider);
  };

  const onAddUser = () => {
    if (!onCanSignUp()) return;

    addUserTrigger({
      email: email?.value!,
      firstName: firstName?.value!,
      lastName: lastName?.value!,
      password: password?.value!,
      role: isProvider ? UserRole.Provider : UserRole.Client,
    });
  };

  const onCanSignUp = (): boolean => {
    const error =
      !isEmpty(firstName?.error) ||
      !isEmpty(lastName?.error) ||
      !isEmpty(email?.error) ||
      !isEmpty(password?.error);
    const missingFilled =
      isEmpty(firstName?.value) ||
      isEmpty(lastName?.value) ||
      isEmpty(email?.value) ||
      isEmpty(password?.value);

    return !error && !missingFilled;
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onNavigateToSignUp = () => {
    history.push(`/${formatPathName(SIGN_IN)}`);
  };

  return {
    email,
    firstName,
    isProvider,
    lastName,
    password,
    showPassword,
    addUserLoading,
    addUserHasError,
    addUserError,
    successMessage,
    isKeyboardOpen,
    topToolBarHeight,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onPasswordChange,
    onIsProvider,
    onAddUser,
    onShowPassword,
    onNavigateToSignUp,
    onCanSignUp,
  };
};
