import { isEmpty } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { useContactMail as useContactMailMutation } from "../../../api/hooks/mutations";
import { CONTACT_MAIL_SENT_MESSAGE } from "../../../utils/messages";
import { IInput } from "../../../utils/types";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { useNativeElementsSizeInfo } from "../../../hooks";

export const useContactMail = () => {
  const [firstName, setFirstName] = useState<IInput<string>>();
  const [lastName, setLastName] = useState<IInput<string>>();
  const [email, setEmail] = useState<IInput<string>>();
  const [subject, setSubject] = useState<IInput<string>>();
  const [message, setMessage] = useState<IInput<string>>();
  const [contactMailLoading, setContactMailLoading] = useState(false);

  /**
   *
   * Hooks
   *
   */
  const { toast } = useCustomToast();

  const { isKeyboardOpen } = useNativeElementsSizeInfo();

  const { contactMail } = useContactMailMutation();

  /**
   *
   * Handlers
   *
   */
  const onInputCheckUpdate = (
    value: string,
    error: string,
    setValue: Dispatch<SetStateAction<IInput<any> | undefined>>,
    validated: boolean
  ) => {
    if (!value || validated) {
      setValue({ value, error });
    } else {
      setValue({ value, error: "" });
    }
  };

  const onFirstNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "First name is required.", setFirstName, false);
  };

  const onLastNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "Last name is required.", setLastName, false);
  };

  const onEmailChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    if (value && !isEmail(value)) {
      onInputCheckUpdate(value, "Email is invalid.", setEmail, true);
      return;
    }

    onInputCheckUpdate(value, "Email is required.", setEmail, false);
  };

  const onSubjectChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "Subject is required.", setSubject, false);
  };

  const onMessageChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "Message is required.", setMessage, false);
  };

  const onVisitSocial = (url: string) => {
    window.open(url, "_blank");
  };

  const onCanContactMail = (): boolean => {
    const error =
      !isEmpty(firstName?.error) ||
      !isEmpty(lastName?.error) ||
      !isEmpty(email?.error) ||
      !isEmpty(subject?.error) ||
      !isEmpty(message?.error);
    const missingFilled =
      isEmpty(firstName?.value) ||
      isEmpty(lastName?.value) ||
      isEmpty(email?.value) ||
      isEmpty(subject?.value) ||
      isEmpty(message?.value);

    return !error && !missingFilled;
  };

  const onContactMail = async () => {
    if (!onCanContactMail()) return;
    setContactMailLoading(true);
    try {
      await contactMail({
        email: email!.value,
        firstName: firstName!.value,
        lastName: lastName!.value,
        message: message!.value,
        subject: subject!.value,
      }).unwrap();

      setContactMailLoading(false);

      toast({ message: CONTACT_MAIL_SENT_MESSAGE });
    } catch (error) {
      setContactMailLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong sending email.",
        buttonDismiss: true,
      });
    }
  };

  return {
    isKeyboardOpen,
    firstName,
    lastName,
    email,
    subject,
    message,
    contactMailLoading,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onSubjectChange,
    onMessageChange,
    onContactMail,
    onVisitSocial,
  };
};
