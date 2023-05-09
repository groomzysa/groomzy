import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { IInput, IPhoto } from "../../../../../utils/types";
import { useUpdateAccount } from "../../../../../api/hooks/mutations";
import { UPDATE_USER_ACCOUNT_MESSAGE } from "../../../../../utils/messages";
import isEmail from "validator/lib/isEmail";
import { useNativeElementsSizeInfo } from "../../../../../hooks";
import { useCustomToast } from "../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { RefresherEventDetail } from "@ionic/react";
import { useFetchUser } from "../../../../../api/hooks/queries";

export const useAccountInfo = () => {
  const [email, setEmail] = useState<IInput<string>>();
  const [firstName, setFirstName] = useState<IInput<string>>();
  const [lastName, setLastName] = useState<IInput<string>>();
  const [photo, setPhoto] = useState<IPhoto>();
  const [userImage, setuserImage] = useState<Blob>();
  let updateAccountLoading = false;

  /**
   *
   * Hooks
   *
   */
  const { autoDisimissToast } = useCustomToast();

  const { isKeyboardOpen, topToolBarHeight } = useNativeElementsSizeInfo();

  const { fetchUser } = useFetchUser();

  const { updateAccount } = useUpdateAccount();

  /**
   *
   * Handlers
   *
   */
  const base64FromPath = async (path: string): Promise<string> => {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("method did not return a string");
        }
      };
      reader.readAsDataURL(blob);
    });
  };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 100,
    });

    const newPhoto = {
      filepath: new Date() + "." + photo.format,
      webviewPath: photo.webPath,
    };

    const base64Data = await base64FromPath(photo.webPath!);
    const response = await fetch(base64Data);
    const blob = await response.blob();
    setPhoto(newPhoto);
    setuserImage(blob);
  };

  const onFirstNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setFirstName({ value });
  };

  const onLastNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setLastName({ value });
  };

  const onEmailChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    if (value && !isEmail(value)) {
      setEmail({ value, error: "Invalid email." });
    } else {
      setEmail({ value, error: "" });
    }
  };

  const onUpdateAccountInfo = async () => {
    updateAccountLoading = true;
    try {
      await updateAccount({
        firstName: firstName?.value,
        lastName: lastName?.value,
        email: email?.value,
        userImage,
      }).unwrap();

      updateAccountLoading = false;

      autoDisimissToast({ message: UPDATE_USER_ACCOUNT_MESSAGE });
    } catch (error) {
      updateAccountLoading = false;
      autoDisimissToast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong updating account.",
        buttonDismiss: true,
      });
    }
  };

  const onRefetchAccountInfo = (event: CustomEvent<RefresherEventDetail>) => {
    fetchUser();
    event.detail.complete();
  };

  return {
    firstName,
    lastName,
    email,
    photo,
    updateAccountLoading,
    isKeyboardOpen,
    topToolBarHeight,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onUpdateAccountInfo,
    takePhoto,
    onRefetchAccountInfo,
  };
};
